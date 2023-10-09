import { useEffect, useState } from "react";
import Card from "../elements/Card";
import { Article } from "../model";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
// import { Pagination } from "flowbite-react";

interface SearchInput {
    search: string;
}

const Innovation = () => {
    const baseUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
    const responseIdEndpoint = "esearch.fcgi";
    const responseJsonEndpoint = "esummary.fcgi";
    const apiKey = "d851057773356ef6e86a446fb1323592c007";

    // const [ currentPage, setCurrentPage ] = useState(1);
    // const nextPage = () => {
    //     setCurrentPage(currentPage + 1);
    // };
    
    //  const prevPage = () => {
    //     setCurrentPage(currentPage - 1);
    // };

    const [articles, setArticle] = useState<Article[]>([]);

    const { register, handleSubmit } = useForm<SearchInput>();
    const onSubmit: SubmitHandler<SearchInput> = (data) => {
        console.log(data);
        getInnovation(data.search);
    }

    const sendRequestToApi = ({ endpoint, params, type }: { endpoint: string; params: {}, type: number }) => {
        return axios
            .get(`${baseUrl}${endpoint}`, { params })
            .then((response: AxiosResponse) => {
                if (type === 0) {
                    return response.data.esearchresult.idlist;
                }
                if (type === 1) {
                    return response.data.result;
                }
            })
            .catch((errors) => {
                console.log(errors);
                throw errors;
            });
    }

    const getInnovation = async (search: string) => {
        const paramsId = {
            db: 'pubmed',
            retmode: 'json',
            term: search,
            sort: 'pub+date',
            retmax: 10,
            api_key: apiKey,
        };

        try {
            const responseIds = await sendRequestToApi({ endpoint: responseIdEndpoint, params: paramsId, type: 0 });
            if (responseIds.length > 0) {
                const paramsObj = {
                    db: 'pubmed',
                    retmode: 'json',
                    id: responseIds.join(),
                    sort: 'pub+date',
                    retmax: 10,
                    api_key: apiKey,

                };
                const responseObj = await sendRequestToApi({ endpoint: responseJsonEndpoint, params: paramsObj, type: 1 });
                responseObj.uids.map((id: string | number) => {
                    let obj = responseObj[id];
                    let article = {
                        title: obj.title,
                        description: "string",
                        authors: obj.authors,
                        pubdate: obj.pubdate,
                        attributes: obj.attributes,
                        elocationid: obj.elocationid,
                        illustrationUrl: "https://picsum.photos/330/300",
                    }
                    setArticle([...articles, article]);
                })
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getInnovation("nouvelles technologies médicales");
    }, []);

    return (
        <section className="bg-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
                <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Innovation Technologies</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Voici les innovations technologique dans le domaine de la santé </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" {...register("search")} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                rechercher
                            </button>
                        </div>
                    </form>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {articles.map((article) => (
                        <Card article={article} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Innovation;