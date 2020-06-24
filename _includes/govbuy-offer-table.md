| Offer amount           | Expected work duration | Date posted       | Date offer closes       |
| ---------------------- | ---------------------- | ----------------- | ----------------------- |
| S\${{ include.offer }} | {{ include.duration }} | {{ include.posted | date: "%a, %d %b %Y" }} | {{ include.closing | date: "%a, %d %b %Y" }} |
