import React, { useEffect } from 'react';
import axios from 'axios';
import { adminProfile } from '../lib/constant';
import { LS_AUTH } from '../config/localStorage';

export default function DashboardPage() {
  useEffect(() => {
    const token = localStorage.getItem(LS_AUTH);
    axios({
      method: 'post',
      url: adminProfile,
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aliquam facere
      aperiam quos modi at et quaerat sit. Beatae ea eum at, quaerat ullam
      commodi non nostrum maiores! Quae ducimus quas, praesentium repellendus ab
      itaque autem suscipit assumenda cumque placeat in enim incidunt deleniti
      neque molestiae fugit aut ipsum eveniet.
    </div>
  );
}
