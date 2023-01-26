import React from 'react';

// MUI imports

// Components

export default function LikedToastList() {
  const [likedToasts, setLikedToasts] = React.useState([]);

  return (
    <>
    {
      likedToasts.map((toast) => (
        toast.firstName
      ))
    };
    </>
  );
}
