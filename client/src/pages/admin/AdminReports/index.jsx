import React, { useEffect, useState, useMemo  } from 'react'
import PageTitle from '../../../components/PageTitle'
import {Helmet} from "react-helmet";
import styled from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice/loaderSlice';
import { getAllReports } from '../../../apicalls/reports';
import { message} from 'antd';
import MaterialReactTable from 'material-react-table';
const AdminReports = () => {
    const [reportsData, setReportsData] = useState([]);
    const dispatch = useDispatch()
    const {mode} = useSelector((state)=> state.darkMode)
     const columns = useMemo(
      () => [
        {
            header: 'İstifadəçi Adı',
            accessorKey: 'user.name',
          
          },
        {
          header: 'İmtahan Adı',
          accessorKey: 'exam.name',
        
        },
        {
          header: 'Tarix',
          accessorKey: 'updatedAt',
        },
        {
          header: 'Ümumi Suallar',
          accessorKey: 'exam.questions.length',
        },
        {
          header: 'Lazım olan nəticə',
          accessorKey: 'exam.passingMarks',
        },
        {
            header: 'Düzgün Cavablar',
          accessorKey: 'result.correctAnswer.length',          
          },
        {
          header: 'Status',
          accessorKey: 'result.verdict',
        },
      ],
      [],
     );
      
      const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllReports();
            if(response.success){
                setReportsData(response.data)
            }else{
                message.error(response.message)
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
      };

      useEffect(()=>{
        getData();
      },[])
  return (
    <div 
    style={mode? {backgroundColor:'rgb(244, 244, 244)'}:{backgroundColor:'#121721'}} 
    className={styled.result_body}>
        <div className={styled.result_container}>
         <div className={styled.pageTitle}>
         <PageTitle title = {'Bütün istifadəçilərin nəticələri'}/>
         </div>

         <div className={styled.table_body}>
          <MaterialReactTable 
          muiTablePaperProps={{
            elevation: 0, //change the mui box shadow
            //customize paper styles
            sx: {
              borderRadius: '50',
              border: '1px solid #e0e0e0',
              
            },
          }}
          displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 20,
          },
        }}  columns={columns} data={reportsData} />
         </div>
        </div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Neticeler</title>
            </Helmet>
    </div>
  )
}

export default AdminReports