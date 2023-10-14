"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const convertToSlug = param => param.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
var _default = convertToSlug;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb252ZXJ0VG9TbHVnIiwicGFyYW0iLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyZXBsYWNlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC91dGlscy9zbHVnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbnZlcnRUb1NsdWcgPSAocGFyYW06IHN0cmluZykgPT5cclxuICBwYXJhbVxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC50cmltKClcclxuICAgIC5yZXBsYWNlKC9bXlxcd1xccy1dL2csICcnKVxyXG4gICAgLnJlcGxhY2UoL1tcXHNfLV0rL2csICctJylcclxuICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnRUb1NsdWc7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTUEsYUFBYSxHQUFJQyxLQUFhLElBQ2xDQSxLQUFLLENBQ0ZDLFdBQVcsRUFBRSxDQUNiQyxJQUFJLEVBQUUsQ0FDTkMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FDeEJBLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQ3hCQSxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztBQUFDLGVBRWRKLGFBQWE7QUFBQSJ9