import { trimExtension } from '../utilities/helpers';

export const noFilenameParam = (resources: string[]): string => {
  let html = `
    <div style='font-family: sans-serif; max-width: 1200px; margin: 4rem auto'>
      <h2>Please provide filename query parameter(required), width & height</h2>
      <p>Available Images:</p>
      <ul>
  `;
  for (const resource of resources) {
    html += `<li><a href='?filename=${trimExtension(resource)}'>${trimExtension(
      resource
    )}</a></li>`;
  }
  html += '</ul></div>';
  return html;
};

export const fileNotFound = () => `
    <div style='font-family: sans-serif; max-width: 1200px; margin: 4rem auto'>
      <h1>404</h1>
      <h2>Image Not Found</h2>
    </div>
  `;
