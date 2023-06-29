/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import "./App.css";
import {Button, Table, message, Select} from "antd";
import {PagingResponse} from "./interfaces/paging";
import ModalCreateStyle from "./components/ModalCreateStyle";
import {fetchStyles, deleteStyle, getListProjects} from "./services/AIStyleService";
import {COLUMN_STYLE} from "./constants";
import Title from "antd/es/typography/Title";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {AxiosError} from "axios";
import {useSearchParams, createSearchParams, useNavigate} from 'react-router-dom';
import tokenAuthService from "./utils/tokenAuthService";
import {pageAccessedByReload} from "./utils/helper";
import {RootState, useAppDispatch} from "./redux/store";
import {useSelector} from "react-redux";
import { getProfile } from "./redux/thunks/authThunk";


function App() {
    const [messageApi, contextHolder] = message.useMessage();
    const [styles, setStyles] = useState<PagingResponse>({items: []});
    const [styleItem, setStyleItem] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listProjectsData, setListProjectsData] = useState<any[]>([]);
    const [selectedProjectData, setSelectedProjectData] = useState<any>({})
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFilter = searchParams.get('project');
    const [queryData, setQueryData] = useState<any>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const authData = tokenAuthService.getLocalAuthUser() || {};

    useEffect(() => {
        if (!authData?.token || !authData?.refreshToken) {
            navigate('/');
        } else if (!userInfo?.id) {
            dispatch(getProfile({token: authData?.token}))
        }
    }, [JSON.stringify(authData)]);

    const getListProjectsData = async () => {
        try {
            const res = await getListProjects();
            if (res) {
                const convertProjectData = res.map((item: any) => ({
                    label: item.project,
                    value: item.project
                }))
                setListProjectsData(convertProjectData);

                if (queryFilter) {
                    const selectedProject = convertProjectData.find((item: any) => item.value === queryFilter);
                    setSelectedProjectData((prev: any) => ({
                        ...prev,
                        ...selectedProject
                    }));
                }
            }
        } catch (err: any) {
            console.log('err', err);
            setListProjectsData([]);
        }
    }

    useEffect(() => {
        getListProjectsData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const queryPage = searchParams.get('page') ? +searchParams.get('page')! : queryData?.page;
        getListStyle(queryPage, queryFilter);
    }, [queryData?.page, queryFilter]);

    const successToast = (message: string) => {
        messageApi.open({
            type: "success",
            content: message,
        });
    };
    const errorToast = (message: string) => {
        messageApi.open({
            type: "error",
            content: message,
        });
    };
    const getListStyle = async (page = 1, project?: any) => {
        try {
            const query = {
                page: page || queryData?.page || searchParams.get('page'),
                project: project || searchParams.get('project')
            }
            if (query.project === undefined || query.project === 'undefined') {
                query.project = ''
            }
            if (searchParams.get('page')) {
                query.page = searchParams.get('page')
            }
            let data = await fetchStyles(query);
            setStyles(data);
            setIsLoading(false);
            successToast("Fetch styles successfuly!");
        } catch (error: AxiosError | any) {
            errorToast("Erroraaaaa!");
        }
    };

    const handleEdit = (id: string) => {
        const specificItem = styles.items.find((item: any) => item._id === id);
        setStyleItem(specificItem);
        setOpen(true);
    }

    const resetStyleItem = () => {
        setStyleItem(null);
    }

    const handleChangePage = (page: number) => {
        setPage(page);
        // setSearchParams(createSearchParams({page: page.toString()}));
        const query = {
            page: page,
        };
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
        setQueryData(query);
    }

    const handleChangeSelectProject = (value: string) => {
        setSearchParams(createSearchParams({project: value ? value : ''}));
        if (value) {
            // getListStyle(1, value);
            const query = {
                page: 1
            };
            searchParams.set('page', page.toString());
            setQueryData(query);
        }
        setSelectedProjectData((prev: any) => ({
            ...prev,
            label: value,
            value
        }))

    }

    const handleCreateStyle = () => {
        setStyleItem({config:{
            style:"none"
        }})
        setOpen(true);
    }

    return (
        <div className="App">
            {contextHolder}
            <Title>AI Style Management</Title>
            <Button type="primary" onClick={handleCreateStyle}>
                Create Style
            </Button>

            {open && <ModalCreateStyle reload={getListStyle} styleItem={styleItem} open={open} setOpen={setOpen}
                                       resetStyleItem={resetStyleItem}/>}

            <div style={{marginTop: '10px'}}>
                Filter by project:
                <Select
                    options={listProjectsData}
                    onChange={handleChangeSelectProject}
                    style={{width: '300px', marginLeft: '10px'}}
                    allowClear={true}
                    defaultValue={selectedProjectData}
                    value={selectedProjectData}
                />
            </div>

            <div style={{padding: 32}}>
                <Table
                    bordered={true}
                    dataSource={styles.items}
                    columns={[
                        ...COLUMN_STYLE,
                        {
                            title: "Action",
                            dataIndex: "_id",
                            key: "createdAt",
                            render: (_, record) => {
                                // deleteStyle(_);
                                return (
                                    <>
                                        <Button
                                            onClick={async () => {
                                                try {
                                                    setIsLoading(true);
                                                    await deleteStyle(_);
                                                    await getListStyle(searchParams.get('page') ? +searchParams.get('page')! : 1);
                                                    setIsLoading(false);
                                                    successToast("Delete successfuly!");
                                                } catch (error) {
                                                    setIsLoading(false);
                                                    errorToast("Error!");
                                                }
                                            }}
                                            type="primary"
                                        >
                                            Delete
                                        </Button>
                                        <Button onClick={() => handleEdit(_)}>Edit</Button>
                                    </>

                                );
                            },
                        },
                    ]}
                    loading={isLoading}
                    rowKey={"_id"}
                    pagination={{
                        pageSize: styles.limit,
                        total: styles.totalItems,
                        current: searchParams.get('page') ? +searchParams.get('page')! : 1,
                        onChange(page, pageSize) {
                            handleChangePage(page)
                        },
                    }}
                />
            </div>

        </div>
    );
}

export default App;
