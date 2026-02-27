export const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString();
};
