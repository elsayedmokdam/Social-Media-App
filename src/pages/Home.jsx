//@ts-check
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../services/user-auth/user/get_user_posts";
import { $Utilities } from "../utilities/utilities-repository";
import { format } from "date-fns";
import { $Services } from "../services/services-repository";
import { useState } from "react";

export default function Home() {
  const [image, setimage] = useState(new File([], "default-image.jpg"));
  const { data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      $Services.POSTS_REPOSITORY.updatePost("69976e1a056bdb7627ee718a", {
        newContent: "Test update  post 15 From Sayed set to number 16",
        privacy: "public",
        removeImage: true,
      }),
  });

  // const { mutate, data, error } = useMutation({
  //   mutationKey: ["create-post"],
  //   mutationFn: () =>
  //     $Services.POSTS_REPOSITORY.createPost({
  //       content: "Test create  post 15 From Sayed",
  //       privacy: "following",
  //       imageFile: image,
  //     }),
  // });
  console.log(data);
  console.log("error message", error);

  $Utilities.Dates.displayRelativeTime("2026-02-12T12:00:00.000Z");
  //  jsObjectDate , tokens dateString

  function handleImage(e) {
    const file = e.target.files[0];
    console.log(file);
    setimage(file);
    mutate();
  }

  return (
    <div>
      Hello From home!
      <input type="file" onChange={handleImage} />
    </div>
  );
}

//  "6994ccea056bdb7627d3f7aa",
// COMMENTS_REPLIES_REPOSITORY.likeAndUnlikeComment(
//         "6994ccea056bdb7627d3f7aa",
//         "6994dc7e056bdb7627d51f20",
//       )
//  name: "Sayed Route",
//         username: "sayedRoute",
//         email: "sayed_1@gmail.com",
//         dateOfBirth: "2000-01-01",
//         gender: "male",
//         password: "Aa@123456",
//         rePassword: "Aa@123456",

// username: "sayed2@sayed.com",
// password: "Sayed@sayed1234",
