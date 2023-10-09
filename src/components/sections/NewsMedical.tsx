import React, { Component, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Article {
  uid: string;
  title: string;
  // Ajoutez d'autres propriétés d'article ici si nécessaire
}

interface NewsMedicalState {
  articles: Article[];
  loading: boolean;
}

const NewsMedical = () => {
  const [ idList, setIdList ] = useState<string[]>([]);
  const [ articles, setArticle ] = useState<Article[]>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  
  useEffect( () => {
    const apiKey = 'd851057773356ef6e86a446fb1323592c007';

    const apiUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
    const apiUrlContent = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';

    const searchTerm = 'nouvelles technologies médicales';

    let params = {
      db: 'pubmed',
      retmode: 'json',
      term: searchTerm,
      sort: 'pub+date',
      retmax: 10,
      api_key: apiKey,

    };

    // Effectuez la requête vers l'API PubMed
    axios
      .get(apiUrl, { params })
      .then((response: AxiosResponse) => {
        const data = response.data.esearchresult.idlist;
        setIdList(data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête PubMed :', error);
        setLoading(false);
      });

      if (idList){
        let params = {
          db: 'pubmed',
          retmode: 'json',
          id: "36387192",
          sort: 'pub+date',
          retmax: 10,
          api_key: apiKey,
    
        };
        axios
          .get(apiUrlContent, {params})
          .then((response: AxiosResponse) => {
            console.log(response);
            
          })
          .catch((errors) => {
            console.log(errors);
            
          })
      }
    }
    , []
  );

  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
        <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
           
        
        </div>
        <div id="technologies_innovation" className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

        </div>
    </div>
</section>
  )
}

export default NewsMedical;
