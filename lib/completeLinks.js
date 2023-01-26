export default function completeLinks(html, baseURL) {
  return html.replace('src="/', `src="${baseURL}/`);
}
