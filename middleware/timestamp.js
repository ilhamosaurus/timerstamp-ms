const timeStamp = (req, res) => {
  const dateString = req.params.date_string;

  const now = new Date();

  if (!dateString) {
    return res.status(200).json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  const pattern1 = /^\d{4}-\d{2}-\d{2}$/; //yyyy-mm-dd
  const pattern2 = /^\d+$/; //UTC number only
  const pattern3 = /^\d{2}\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}?/i; //dd 'Month' yyyy

  let unix;
  let utc;

  if (dateString.match(pattern1) || dateString.match(pattern3)) {
    const givenDate = new Date(dateString);

    unix = givenDate.getTime();
    utc = givenDate.toUTCString();

    return res.status(200).json({
      unix: Number(unix),
      utc
    })
  };

  if (dateString.match(pattern2)) {
    const dateObj = new Date(Number(dateString));

    unix = Number(dateString)

    utc = dateObj.toUTCString();

    return res.status(200).json({
      unix,
      utc
    });
  }

  return res.json({
    'error': 'Invalid date'
    });
}

module.exports = timeStamp;