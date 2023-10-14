export function getFormFromObject(data: any) {
  const formData = new FormData();
  if (!data) {
    return null;
  }
  Object.keys(data).forEach(eachKey => {
    if (Array.isArray(data[eachKey])) {
      data[eachKey].forEach((each: any) => formData.append(eachKey, each));
    } else {
      formData.append(eachKey, data[eachKey]);
    }
  });
  return formData;
}
export function formatName(name: string) {
  let build = '';
  for (let i = 0; i < name?.length || 0; i += 1) {
    if (i < 2 || i > name.length - 2) {
      build += name.charAt(i);
    } else {
      build += '*';
    }
  }
  return build;
}
const convertToSlug = (param: string) =>
  param
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
