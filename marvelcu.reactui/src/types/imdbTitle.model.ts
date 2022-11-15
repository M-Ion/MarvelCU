export default interface IimdbTitle {
  base: {
    title: string;
    image: {
      url: string;
    };
    year: number;
  };
}

export interface IimdbActor {
  base: {
    image: {
      url: string;
    };
    name: string;
  };
}
