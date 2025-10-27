import html2canvas from 'html2canvas';

const formatDateSegment = (value) => String(value).padStart(2, '0');

/**
 * Genera un PNG de la sección indicada y dispara la descarga.
 * @param {HTMLElement} node
 * @returns {Promise<void>}
 */
export const exportSummaryAsImage = async (node) => {
  if (!node) return;
  const canvas = await html2canvas(node, {
    backgroundColor:
      getComputedStyle(document.body).backgroundColor || '#0c0d14',
    scale: window.devicePixelRatio > 1 ? 2 : 1
  });
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const now = new Date();
  link.download = `votos-ot25_${now.getFullYear()}-${formatDateSegment(
    now.getMonth() + 1
  )}-${formatDateSegment(now.getDate())}_${formatDateSegment(
    now.getHours()
  )}${formatDateSegment(now.getMinutes())}.png`;
  link.href = url;
  link.click();
};
