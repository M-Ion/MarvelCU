export default interface IimdbTitle {
  id: string;
  base: {
    title: string;
    image: {
      url: string;
    };
    year: number;
  };
  cast: IimdbActor[];
}

export interface IimdbActor {
  id: string;
  base: {
    image: {
      url: string;
    };
    name: string;
  };
}
