// i18n:render-copy
import { t } from '../i18n';
import { useState } from 'react';
import { PagePhoto } from './EditorialPage';

const photographs = [
  ['Image2.jpeg', 'Live online discussion'],
  ['Image7.png', 'Building a structured argument'],
  ['Image3.png', 'Timed speaking practice'],
];
export default function LearningGallery() {
  const [index, setIndex] = useState(0);
  const [file, caption] = photographs[index];
  const move = direction => setIndex(value => (value + direction + photographs.length) % photographs.length);
  return <section className="learning-gallery editorial-inner" aria-label={t("Learning at DebateCraft")}>
    <PagePhoto file={file} alt={t(caption)} eager />
    <div className="learning-gallery__controls"><p>{t(caption)}</p><div><span role="status" aria-atomic="true">{t(index + 1)}{t(" / ")}{t(photographs.length)}</span><button type="button" aria-label={t("Previous photograph")} onClick={() => move(-1)}>{t("←")}</button><button type="button" aria-label={t("Next photograph")} onClick={() => move(1)}>{t("→")}</button></div></div>
  </section>;
}
