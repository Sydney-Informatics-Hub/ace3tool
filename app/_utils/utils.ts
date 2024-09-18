export function number_range(n: number) {
  return [...Array(n).keys()];
}

const base_path_prefix = process.env.BASE_PATH || "";
export { base_path_prefix };
