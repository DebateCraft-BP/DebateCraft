// One-time, explicit source codemod using the parser already bundled with Vite.
import { parseSync } from 'rolldown/experimental';
import { decodeHTML } from 'entities';
import { readFile, writeFile } from 'node:fs/promises';
import { relative, dirname } from 'node:path';
const displayAttributes = new Set(['alt', 'title', 'placeholder', 'aria-label', 'aria-valuetext', 'label', 'caption', 'intro', 'eyebrow']);
function cleanJSX(value) {
  const lines = value.split(/\r\n|\n|\r/);
  const last = lines.findLastIndex(line => /[^ \t]/.test(line));
  return lines.map((line, i) => {
    let text = line.replace(/\t/g, ' ');
    if (i) text = text.replace(/^ +/, '');
    if (i !== lines.length - 1) text = text.replace(/ +$/, '');
    return text + (text && i < last ? ' ' : '');
  }).join('');
}
for (const file of process.argv.slice(2)) {
  let source = await readFile(file, 'utf8');
  if (source.includes('// i18n:render-copy')) continue;
  const ast = parseSync(file, source, { lang: 'jsx' });
  if (ast.errors.length) throw new Error(JSON.stringify(ast.errors));
  const patches = [];
  function insert(position, text) { patches.push({ start: position, end: position, text }); }
  function expression(node, name = 't') {
    if (node.type === 'CallExpression' && node.callee.name === name) return;
    if (node.type === 'TemplateLiteral' && name === 't') {
      const pattern = node.quasis.map((part, i) => part.value.cooked + (i < node.expressions.length ? `{${i}}` : '')).join('');
      const values = node.expressions.map(exp => `t(${source.slice(exp.start, exp.end)})`).join(', ');
      patches.push({ start: node.start, end: node.end, text: `t(${JSON.stringify(pattern)}, [${values}])` });
      return;
    }
    insert(node.start, `${name}(`); insert(node.end, ')');
  }
  function walk(node, parent) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'JSXText') {
      const value = decodeHTML(cleanJSX(node.value));
      if (value.trim()) patches.push({ start: node.start, end: node.end, text: `{t(${JSON.stringify(value)})}` });
      return;
    }
    if (node.type === 'JSXAttribute') {
      const attr = node.name.name;
      const helper = attr === 'href' ? 'localeHref' : displayAttributes.has(attr) ? 't' : null;
      if (helper && node.value?.type === 'Literal' && typeof node.value.value === 'string') {
        patches.push({ start: node.value.start, end: node.value.end, text: `{${helper}(${JSON.stringify(node.value.value)})}` });
      } else if (helper && node.value?.type === 'JSXExpressionContainer') expression(node.value.expression, helper);
      // Continue into callback/React element expressions, but not the already handled value.
      if (node.value?.expression) walk(node.value.expression, node);
      return;
    }
    if (node.type === 'JSXExpressionContainer' && parent?.type !== 'JSXAttribute') {
      const exp = node.expression;
      if (exp.type !== 'JSXEmptyExpression' && exp.type !== 'JSXElement' && exp.type !== 'JSXFragment' && exp.type !== 'LogicalExpression') expression(exp);
    }
    for (const [key, value] of Object.entries(node)) {
      if (['start', 'end', 'loc'].includes(key)) continue;
      if (Array.isArray(value)) value.forEach(child => walk(child, node));
      else if (value && typeof value === 'object') walk(value, node);
    }
  }
  walk(ast.program);
  // Edits are applied from the end so original parser offsets stay valid.
  patches.sort((a, b) => b.start - a.start || b.end - a.end);
  for (const patch of patches) source = source.slice(0, patch.start) + patch.text + source.slice(patch.end);
  const importPath = relative(dirname(file), 'src/i18n').replaceAll('\\', '/');
  source = `// i18n:render-copy\nimport { t, localeHref } from '${importPath.startsWith('.') ? importPath : `./${importPath}`}';\n` + source;
  const check = parseSync(file, source, { lang: 'jsx' });
  if (check.errors.length) throw new Error(`${file}: ${JSON.stringify(check.errors)}`);
  await writeFile(file, source);
  console.log(file);
}
