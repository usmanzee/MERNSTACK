import { constants } from "../constants";

const showButtonLoader = () => {
  return {
    type: constants.SHOW_LOADER,
  };
};

const hideButtonLoader = () => {
  return {
    type: constants.HIDE_LOADER,
  };
};

export const ButtonLoaderActions = {
  showButtonLoader,
  hideButtonLoader,
};
