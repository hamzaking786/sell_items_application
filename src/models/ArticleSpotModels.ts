export interface IArticleSpot {
    id: number;
    title: string;
    description: string;
    hashtags: string[];
    comments: string[];
    image: {
      id: string;
    };
    user_created: {
      first_name: string;
    };
  }
  
  export interface IArticleSpotResponse {
    camp_spots_by_id: IArticleSpot;
  }
  
  export interface IArticleSpotsResponse {
    camp_spots: IArticleSpot[];
  }

export interface INewArticleSpot {
  title: string,
  description: string,
  hashtags: string[],
  image: string
}

  