import axios from "axios"
import React,{useEffect,useState} from "react"
import _ from "lodash";


const pageSize =10
const Details = () => {
    const [info,setInfo] = useState();
    const [paginationinfo,setpaginationInfo]=useState();
    const[currentpage,setcurrentPage]=useState()


const [search,setSearch] = useState("");

    
//Api call
    useEffect (()=>{
        axios.get("http://localhost:3500/details").then((res)=>{

setInfo(res.data)
setpaginationInfo(_(res.data).slice(0).take(pageSize).value());
    });
  },[]);
   const pageCount = info?Math.ceil(info.length/pageSize):0;
   if (pageCount ===1) return null;
       const pages =_.range(1,pageCount+1)

       //pagination function
       const pagination =(pageNo)=>{
        setcurrentPage(pageNo);
        const startIndex =(pageNo -1) * pageSize;
        const paginationinfo = _(info).slice(startIndex).take(pageSize).value();
        setpaginationInfo(paginationinfo)


        
       }
  return (
    
    <div class ="text-center text-sn-start bg-info text-white mh-100  w-100 max-height: 100% man-width:1440px ">
         {/* ///Table Data */}
         <br></br><br></br><br></br><br></br><br></br>
         <form >


            <input type="text" placeholder="Search Here" class="  form-control w-25 mx-auto" onChange={(e) => setSearch(e.target.value)}/>
         </form>

<br></br><br></br>
<br></br>
        {
 !paginationinfo ?("no data found"):(
    <table class="table w-75 mx-auto"   >
        <thead className="p-3 mb-2 bg-warning text-dark max-auto">
            <tr>
                <th>ID</th>
                <th>User-ID</th>
                <th>CandidateName</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody className="p-3 mb-2 bg-dark text-white">

            {/* //search functionality */}
             {
                paginationinfo.filter((info )=>{
                    return search.toLowerCase() ===''? info : info.CandidateName.toLowerCase().includes(search);
                }).map((info,index)=>(
                    <tr key={index}>
                        <td>{info.id}</td>
                        <td>{info.userId}</td>
                        <td>{info.CandidateName}</td>
                        <td>{info.Email}</td>
                        <td>{info.Mobile}</td>
                        <td>{info.Status}</td>
                    </tr>
                   
                ))
             }
        </tbody>
    </table>

 )}<br></br>


 {/* <--Pagination Structure---> */}

 <nav class="text-centern d-flex justify-content-center" >
    <ul className="pagination">
       {pages.map((page)=>(
<li 
className={
    page === currentpage ? "page-item active": "page-item"}>
       <p className="page-link " onClick={()=>pagination(page)}>{page}</p>
       </li>
       ))
       
         }
    </ul>
 </nav>
 <br></br><br></br><br></br>
 <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
 <br></br><br></br><br></br>
 <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  );
}
export default Details
