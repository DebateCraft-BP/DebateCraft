import { useRef } from 'react';

export default function Tabs({ label, items, value, onChange, idPrefix, orientation = 'horizontal', className = '' }) {
  const refs = useRef({});
  const [previous, next] = orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];

  function onKeyDown(event) {
    const index = items.findIndex(item => item.id === value);
    let target = null;
    if (event.key === next) target = (index + 1) % items.length;
    else if (event.key === previous) target = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = items.length - 1;
    if (target === null) return;
    event.preventDefault();
    onChange(items[target].id);
    refs.current[items[target].id]?.focus();
  }

  return <div role="tablist" aria-label={label} aria-orientation={orientation} className={className} onKeyDown={onKeyDown}>
    {items.map(item => <button
      type="button" role="tab" key={item.id} id={`${idPrefix}-tab-${item.id}`}
      ref={node => { refs.current[item.id] = node; }}
      aria-selected={value === item.id} aria-controls={`${idPrefix}-panel`} tabIndex={value === item.id ? 0 : -1}
      className={`resource-tab${value === item.id ? ' active' : ''}`} onClick={() => onChange(item.id)}
    >{item.label}{item.meta && <span>{item.meta}</span>}</button>)}
  </div>;
}
