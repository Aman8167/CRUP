

var addbtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closebtn = document.querySelector(".close-icon");
addbtn.onclick = function(){
    modal.classList.add("active");
}
closebtn.addEventListener("click",()=>{

    modal.classList.remove("active");
});

var userData = [];
var idEl = document.getElementById("id");
var nameEl = document.getElementById("name");
var idsEl = document.querySelector("#ids");
var namesEl = document.querySelector("#names");
var registerBtn = document.querySelector("#register-Btn");
var registerform = document.querySelector("#register-form");
var imgurl;


/*start signup page*/ 
registerform.onsubmit = function(e){
    e.preventDefault();
    regitrationData();
    getDataFromlocal();
    registerform.reset('');
    closebtn.click();
}

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}


function regitrationData(){
   userData.push({

    id : idEl.value,
    name : nameEl.value,
    ids : idsEl.value,
    names : namesEl.value,
   profilePic : imgurl == undefined ? "images/R.jpg" : imgurl

   });
   var userstring = JSON.stringify(userData);
   localStorage.setItem("userData",userstring);
   swal("Good job!", "Registration success!", "success");
}

var tableData = document.querySelector("#table-data");
const getDataFromlocal = () =>{
    tableData.innerHTML = "";
   userData.forEach((data,index)=>{
    tableData.innerHTML += `
    <tr index='${index}'>
    <td>${index+1}</td>
     <td><img src="${data.ProfilePic}" width="40" ></td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.names}</td>
    <td>${data.ids}</td>
    <td>
    <button class="edit-bn"><i class="fa fa-eye"></i></button>
    <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
    </td>
    </tr>

    `;
   });
var i;
   var allDelBtn = document.querySelectorAll(".del-btn")
   for(i=0;i<allDelBtn.length; i++){
    allDelBtn[i].onclick = function(){
         var tr = this.parentElement.parentElement;
         var id = tr.getAttribute("index");
         swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userData.splice(id,1);
                localStorage.setItem("userData",JSON.stringify(userData));
                tr.remove();

              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
         
    }
   }

  var i;
   var allEdit = document.querySelectorAll(".edit-btn");
      for(i=0;i<allEdit.length;i++){
        allEdit[i].onclick = function(){
            
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profile_Pic = imgTag[0].src;
            alert(Profile_pic);
        }
      }
} 
getDataFromlocal();

var Profile_pic = document.querySelector("#profile-pic");
var uploadpic = document.querySelector("#upload-field");
uploadpic.onchange = function(){
    if(uploadpic.files[0].size < 1000000){

        var fReader = new FileReader();
        fReader.onload = function(e){
         imgurl = e.target.result;
            Profile_pic.src = imgurl;
            console.log(imgurl);
        }
        fReader.readAsDataURL(uploadpic.files[0]);

    }else{
        alert("File Size Is To Long");
    }
}