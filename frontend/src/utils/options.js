const options = (token) => {
    return {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
}

export default options;