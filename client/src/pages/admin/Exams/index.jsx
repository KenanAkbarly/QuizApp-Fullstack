import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/PageTitle'
import style from './style.module.scss'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice/loaderSlice'
import { deleteExamById, getAllExams } from '../../../apicalls/exmas'
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {Helmet} from "react-helmet";
const columns = [
  {
    label: 'Imtahan adı',
    id: 'name',
    minWidth: 170,
    align: 'center',
  },
  {
    label: 'İmtahan müddəti',
    id: 'duration',
    minWidth: 170,
    align: 'center',
  },
  {
    label: 'Imtahan kategoriyası',
    id: 'category',
    minWidth: 170,
    align: 'center',
  },
  {
    label: 'Maximum nəticə',
    id: 'totalMarks',
    minWidth: 170,
    align: 'center',
  },
  {
    label: 'Minimum nəticə',
    id: 'passingMarks',
    minWidth: 170,
    align: 'center',

  },

];
const Exams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([])
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {mode} = useSelector((state)=> state.darkMode)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());
      if (response.success) {
        setExams(response.data)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const deleteExam = async (examId) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExamById({
        examId,
      })
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  useEffect(() => {
    getExamsData();
  }, [])
  return (
    <div className={mode? style.addEditExam_body: style.darkaddEditExam_body}>
      <div >
      <Helmet>
                <meta charSet="utf-8" />
                <title>İmtahanlar</title>
            </Helmet>
        <div className={style.exams_header}>
          <PageTitle title="İmtahanlar" />
          <button
          style={mode? {border:'2px solid  #253858',color:" #253858"} :{border: "2px solid #264e93",color: "#264e93"}}
          className={style.add_button} onClick={() => navigate('/admin/exams/add')}>
            <i className='ri-add-line'></i>
            Imtahan əlavə et
          </button>
        </div>
        <div className={style.table_section}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <p className={style.action_name}>Əməliyyatlar</p>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((exam) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={exam.code}>

                          {columns.map((column) => {
                            const value = exam[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );

                          })}

                          <div className={style.action}>
                            <span onClick={() => navigate(`/admin/exams/edit/${exam._id}`)}><FiEdit3 /></span>
                            <span onClick={() => deleteExam(exam._id)}><RiDeleteBin6Line /></span>
                          </div>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 15, 50]}
              component="div"
              count={exams.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Exams