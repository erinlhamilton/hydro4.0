var chart = c3.generate({
    data: {
        xs: {
            'Precipitation': 'x1',
            'Streamflow': 'x2',
        },
     columns: [
            ['x1', 10, 30, 45, 50, 70, 100],
            ['x2', 30, 50, 75, 100, 120],
            ['Precipitation', 30, 200, 100, 400, 150, 250],
            ['Streamflow', 20, 180, 240, 100, 190]
        ]
    }
});
