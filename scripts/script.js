/* =============================================================================
                                showImage
============================================================================= */


function showImage(fileInput) {
  const files = fileInput.files;


  for (let i = 0; i < files.length; i++) {
    const file      = files[i];
    const imageType = /image.*/;


    //In most cases, this should never happen because we specified accept="image/*"
    //in the HTML. That said, the accept attribute has no support in IE 6-9, and Edge 12-18
    if (!file.type.match(imageType)){
      alert("That's not an image!");
      //The continue statement "jumps over" one iteration in the loop.
      //Because we're only submtting one file here, it means that it skips everything.
      //Thus in this case, it's similar to just returning early.
      continue;
    }


    //When the user resets the image to a new image, remove the previous image and container.
    if (document.getElementById('user-image-thumbnail-container')){
      document.getElementById('user-image-thumbnail-container').remove();
    }


    //https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
    //Create a newImgContainer element, and insert it right after the input.
    const newImgContainer = document.createElement('DIV');
    newImgContainer.id    = 'user-image-thumbnail-container';
    imageInput.parentNode.insertBefore(newImgContainer, imageInput.nextSibling);


    //Create a newImg element, and insert it into newImgContainer
    const newImg = document.createElement('IMG');
    newImg.id    = 'user-image-thumbnail';
    newImgContainer.appendChild(newImg);


    const userImageThumbnail = document.getElementById("user-image-thumbnail");
    userImageThumbnail.file  = file;


    const reader = new FileReader();


    reader.onload = (function(userImg) {
      return function(e) {
        userImg.src = e.target.result;
        userImg.alt = "User image"
      };
    })(userImageThumbnail);


    reader.readAsDataURL(file);
  }//End of for loop
}//End of showImage



/* =============================================================================
                                Event Listeners
============================================================================= */


const imageForm      = document.getElementById('image-form');
const imageInput     = document.getElementById('image-input');
const fakeImageInput = document.getElementById('fake-image-input');


imageInput.addEventListener('change', function(){
  showImage(this);
});


fakeImageInput.addEventListener('click', function(){
  imageInput.click();
});


//Optional event listener to hand submission manually.
imageForm.addEventListener('submit', function(e){
  e.preventDefault();
  const firstName = e.target.elements.firstName.value;
  const lastName  = e.target.elements.lastName.value;
  const userImage = e.target.elements.userImage.value;
  //Do somthing with data...
});


//Test the fake-file-input height, and set the thumbnail to that in the CSS.
// window.onload = function(){
//   const fakeFileInput = document.getElementById('fake-file-input');
//   const offsetHeight  = fakeFileInput.offsetHeight;
//   console.log("offsetHeight", offsetHeight);
// }
