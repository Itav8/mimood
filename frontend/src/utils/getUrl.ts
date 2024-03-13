export const getApiUrl = () => {
  return (
    import.meta.env.VITE_API_URL ||
    "http://ec2-54-175-131-211.compute-1.amazonaws.com:3000"
  );
};
