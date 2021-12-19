import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const navigate = useNavigate();
  const [postsArr, setPostsArr] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    let { posts,currentUser } = localStorage;
    if (posts && currentUser) {
      let parsedPosts = JSON.parse(posts);
      let ParsedCurrentUser = JSON.parse(currentUser);
      setPostsArr(parsedPosts);
      setCurrentUser(ParsedCurrentUser);
    } else {
      navigate("/login");
    }
  }, []);
  
  const checkLike = () => {
    if (postsArr[props.index].likes.includes(currentUser.username)) {
      postsArr[props.index].likes.splice(
        postsArr[props.index].likes.indexOf(currentUser.username),
        1
      );
      setPostsArr(postsArr);
      localStorage.setItem("posts", JSON.stringify(postsArr));
    } else {
      postsArr[props.index].likes.push(currentUser.username);
      setPostsArr(postsArr);
      localStorage.setItem("posts", JSON.stringify(postsArr));
    }
    props.testSolveRefresh("test"+Math.random());
  };
  const addCommetFunc = (e) => {
    e.preventDefault();
    postsArr[props.index].comments.push(newComment);
    setPostsArr(postsArr);
    localStorage.setItem("posts", JSON.stringify(postsArr));
    // props.testSolveRefresh("test"+Math.random());
  };

  return (
    <div>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            {postsArr[props.index]
              ? postsArr[props.index].postText
              : "Empty Content"}
          </Card.Text>
          <Card.Text>
            {postsArr.length && postsArr[props.index].likes.length}
          </Card.Text>
          {props.deleteFunc && (
            <Button
              variant="primary"
              onClick={() => props.deleteFunc(props.index)}
            >
              Delete
            </Button>
          )}
          {!props.deleteFunc && props.role == "user" && (
            <Button
              variant="primary"
              onClick={() => {
                checkLike();
              }}
            >
              like 👍
            </Button>
          )}
        </Card.Body>
        <Form onSubmit={addCommetFunc}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form>
        <Card.Footer className="text-muted">
          {postsArr[props.index] ? (
            postsArr[props.index].comments.map((data, index) => (
              <Card.Text key={index}>{data}</Card.Text>
            ))
          ) : (
            <Card.Text>no comments</Card.Text>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
