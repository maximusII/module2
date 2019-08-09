const URL = "http://localhost:3000/notes";

export const getNotes = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const saveNote = async note => {
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  };

  try {
    const response = await fetch(URL, opts);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async id => {
  const opts = {
    method: "DELETE"
  };

  try {
    const response = await fetch(`${URL}/${id}`, opts);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
