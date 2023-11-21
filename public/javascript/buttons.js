$(".edit-button").each((index, element) => {
  $(element).click((event) => {
    var postID = $(element).parent().attr("id");
    fetch(`/edit/${postID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Item opened for edit successfully');
        window.location.href = "/";
      }).catch(error => console.error('Error:', error));
  });
});
$(".edit-submit-button").each((index, element) => {
  $(element).click((event) => {
    var postID = $(element).parent().attr("id");
    var content = $(element).parent().children("textarea").val();
    fetch(`/edit-submit/${postID}/${content}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Item editted successfully');
        window.location.href = "/";
      }).catch(error => console.error('Error:', error));
  });
});
$(".delete-button").each((index, element) => {
  $(element).click((event) => {
    var postID = $(element).parent().attr("id");
    fetch(`/delete/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Item deleted successfully');
        window.location.href = "/";
      }).catch(error => console.error('Error:', error));
  });
});