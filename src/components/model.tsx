export interface Article {
    title: string;
    description: string;
    authors: { name: string }[];
    pubdate: string;
    attributes: string[];
    elocationid: string;
    illustrationUrl: string;    
}
