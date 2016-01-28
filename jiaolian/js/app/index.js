var xhr=new XMLHttpRequest();
xhr.open("git","http://haijia.bjxueche.net:8008/qd/getJlYyCDinfo?empid=120&pagesize=30&pageindex=1& cnbh=468&os=an");
xhr.onreadystatechange=function(){
    console.log(3)
    if(this.status==2&&this.readyState==4){
        console.log(xhr.responseText)
    }
}
//xhr.send();