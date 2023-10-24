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
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        } else {
          throw new Error("서버 응답 오류");
        }
      })
      .then((data) => {
        // 서버 응답 처리
        console.log("서버 응답:", data);
        alert("게시물이 성공적으로 업로드되었습니다.");
      })
      .catch((error) => {
        // 오류 처리
        console.error("오류 발생:", error);
        alert("오류 발생: " + error.message);
      });
  });
});
