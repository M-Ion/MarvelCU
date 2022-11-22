export interface ImdbTitle {
  id: string;
  base: {
    title: string;
    image: {
      url: string;
    };
    year: number;
  };
  cast: ImdbActor[];
}

export interface ImdbActor {
  id: string;
  base: {
    image: {
      url: string;
    };
    name: string;
  };
}
