const formatDate = date =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(
    date.getDate()
  ).padStart(2, 0)}`;

export default formatDate;
