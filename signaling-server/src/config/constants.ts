declare let process : {
  env: {
    PORT: number
  }
};

const PORT = process.env.PORT || 4000;
export default PORT;
