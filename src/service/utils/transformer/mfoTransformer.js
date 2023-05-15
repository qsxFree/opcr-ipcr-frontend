import moment from "moment";

const tranformForRequest = (formData) => {
  return {
    code: formData.code,
    name: formData.name,
    description: formData.description,
    year: moment(formData.year).year().toString(),
  };
};

const MfoTransoformer = {
  tranformForRequest,
};

export default MfoTransoformer;
