export function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}
