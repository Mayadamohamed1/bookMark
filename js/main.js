//& html Element
var siteNameInput=document.getElementById("siteName");
var siteUrlInput=document.getElementById("siteUrl");
var tBody=document.getElementById("tBody");
var updateBtn=document.getElementById("updateBtn")
var submitBtn=document.getElementById("submitBtn")
// console.log(siteNameInput);
// console.log(siteUrlInput);
//^ app variable
var allbookMarks=[];
var booktoUpdate;
if(localStorage.allBook!=null){
    allbookMarks=JSON.parse(localStorage.allBook);
    displayallBook(allbookMarks);
}
//* function
function addBookMark(){
    if(validName() &&validUrl())
   {
    var newBookMark={
        siteName:siteNameInput.value,
        siteUrl:siteUrlInput.value
    };
    allbookMarks.push(newBookMark);
    localStorage.setItem("allBook",JSON.stringify(allbookMarks));
    displayallBook(allbookMarks);
    clearForm();
    

    // console.log(allbookMarks);
}else{
    alert("8lt! Verify the data");
}
   }
function displayallBook(arr){
    var BookStore="";
for(var i=0; i<arr.length;i++){
BookStore+=`   <tr>
<td>${i+1}</td>
<td>${arr[i].siteName}</td>
<td><a class="btn btn-success" href="${arr[i].siteUrl}" target="_blank">Visite</a></td>
<td><button class="btn btn-warning" onclick="preUpdate(${i})">Update</button></td>
<td><button class="btn btn-danger" onclick="deleteBook(${i})">Delete</button></td>
</tr>`
}
tBody.innerHTML=BookStore;
}
function clearForm(){
    siteNameInput.value="";
    siteUrlInput.value="";
}
function preUpdate(index){
    booktoUpdate=index;
siteNameInput.value=allbookMarks[index].siteName;
siteUrlInput.value=allbookMarks[index].siteUrl;
displayUpdateBtn();
}
function displayUpdateBtn(){
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}
function displaySubmitBtn(){
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
}
function finishUpdate(){
    var newUpdate={
        siteName:siteNameInput.value,
        siteUrl:siteUrlInput.value,
    };
    allbookMarks.splice(booktoUpdate,1,newUpdate);
    localStorage.setItem("allBook",JSON.stringify(allbookMarks));
    displayallBook(allbookMarks);
    displaySubmitBtn();
    clearForm();
}
function deleteBook(index){
allbookMarks.splice(index,1);
localStorage.setItem("allBook",JSON.stringify(allbookMarks));
displayallBook(allbookMarks);
}
var regexUrl=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
function validUrl(){
    if(regexUrl.test(siteUrlInput.value)){
            siteUrlInput.classList.add("is-valid");
                siteUrlInput.classList.remove("is-invalid");
                return true;
            }else{
                siteUrlInput.classList.add("is-invalid");
                siteUrlInput.classList.remove("is-valid");
                return false;
            }
}
var regexName=/[A-za-z0-9]{3,}/;
function validName(){
    if(regexName.test(siteNameInput.value)){
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        return true;
            }else{
                siteNameInput.classList.add("is-invalid");
                siteNameInput.classList.remove("is-valid");
                return false;
            }
}
//^events
