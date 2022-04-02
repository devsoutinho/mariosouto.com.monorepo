export function postTemplate({ title, url, date, excerpt, postType, content }: any) {
  const hasContent = Boolean(content);
  return `---
  title: ${JSON.stringify(title)}
  url: ${url}
  date: ${date}
  postType: ${postType}
  excerpt: ${JSON.stringify(excerpt)}
  ---
  
  ${hasContent ? content : 'No content'}
  `;
}
