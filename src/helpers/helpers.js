export function getFileExt(fileName){
    return fileName.split('.').pop();
}

export function checkMediaType(fileExt){
    const imgExt = ['tif', 'tiff', 'jpeg', 'jpg', 'jif', 'jfif', 'jp2', 'jpx', 'j2k', 'j2c', 'svg', 'bmp', 'png'];
    const videoExt = ['mpg', 'mpeg', 'ogg', 'webm', 'mp4'];
    
    return (imgExt.indexOf(fileExt) >= 0) ? 'image' : (videoExt.indexOf(fileExt) >= 0) ? 'video' : false;
}

export function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}
  
  export function isCorrectURLMedia(url){
    if(isURL(encodeURI(url))){
        const ext = getFileExt(url);
        const mediaType = checkMediaType(ext);
        return (mediaType === 'image' || mediaType === 'video') ? true : false;
    }else{
        return false;
    }
  }
  

  export function formatDateFromStr(str){
    let myDate = new Date(str);
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${myDate.getDate()} ${months[myDate.getMonth()]}, ${myDate.getFullYear()}`;
  }

  export function countOrderByTable(orders, maban){
    let count = 0;
    orders.forEach(item => {
      if(item.ma_ban.toString() === maban.toString())
        count += Number(item.so_luong_to);
    })
    return count;
  }