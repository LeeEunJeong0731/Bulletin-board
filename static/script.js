ocument.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageInput");
  const commentInput = document.getElementById("commentInput");
  const postButton = document.getElementById("postButton");

  // 이미지 업로드 및 댓글 게시 이벤트 처리
  postButton.addEventListener("click", function () {
    const imageFile = imageInput.files[0];
    const comment = commentInput.value;

    if (!imageFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    // FormData 객체 생성 및 데이터 추가
    const formData = new FormData();
    formData.append("image", imageFile); // 이미지 파일
    formData.append("comment", comment); // 댓글 내용

    // 서버로 데이터 전송
    fetch("/goto-subpage", {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          // 서버가 200 OK 응답을 보내면 서브페이지로 이동
          window.location.href = "/subpage";
        } else {
          // 오류 처리
          console.error("서버 응답 오류");
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error("오류 발생:", error);
      });
  });
});
