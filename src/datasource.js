export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width:'50',
    renderCell: (params) => {
       return params.api.getRowIndex(params.row.id) + 1
    }
    
  },
  
    {
      field: "videoname",
      headerName: "Video name",
      width:'250'
    }
    
  
   
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];

  export const logindata = [
    {
      field: "id",
      headerName: "ID",
      width:'50',
      renderCell: (params) => {
         return params.api.getRowIndex(params.row.id) + 1
      }
      
    },
    {
      field: "username",
      headerName: "User Name",
      width:'150'
    },
    {
      field: "PassValue",
      headerName: "Password",
      width:'150'
    },
    {
      field: "updated_at",
      headerName: "Update Time",
      width:'250'
    }
  ]
  export const playerStage =[
    {
      id:1,
      stage:'Stage-1'
    },
    {
      id:2,
      stage:'Stage-2'
    },
    {
      id:3,
      stage:'Stage-3'
    },
    {
      id:4,
      stage:'Stage-4'
    },
    {
      id:5,
      stage:'Stage-5'
    },
    {
      id:6,
      stage:'Stage-6'
    },
    {
      id:7,
      stage:'Stage-7'
    },
    {
      id:8,
      stage:'Stage-8'
    }
   
  ]
  export const playerColumns = [
    { field: "stage", headerName: "Match" },
    { field: "playerName", headerName: "Name" },
    { field: "group", headerName: "Group" },
    { field: "round16", headerName: "Round-16" },
    { field: "round8", headerName: "Round-8"},
    { field: "round4", headerName: "Round-4" },
    { field: "round2", headerName: "Round-2" },
    { field: "round1", headerName: "Round-1" },
  ]
  export const passwordColumns = [
    { field: "PassValue", headerName: "Password",width:'200' },
    { field: "date", headerName: "Date",width:'300' }
  ]
  export const nftdata = [
    {
      field: "id",
      headerName: "ID",
      width:'50',
      renderCell: (params) => {
         return params.api.getRowIndex(params.row.id) + 1
      }
      
    },
    {
      field: "title",
      headerName: "Title",
      width:'150'
    },
    {
      field: "type",
      headerName: "Type",
      width:'150'
    },
    {
      field: "details",
      headerName: "Details",
      width:'150'
    },
    {
      field: "address",
      headerName: "Address",
      width:'150'
    },
    {
      field: "creator",
      headerName: "Creator",
      width:'150'
    },
    {
      field: "link",
      headerName: "Link",
      width:'150'
    },
    {
      field: "collection",
      headerName: "Collection",
      width:'150'
    },
    {
      field: "file_path",
      headerName: "Path",
      width:'570'
    },
  ]