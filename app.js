var app = {
    oneDimensionSample: function () {

        var knn = new KNN(1);

        var smartphone1 = new DataSet('smartphone', [5.5]);
        knn.addDataset(smartphone1);
        var smartphone2 = new DataSet('smartphone', [5.2]);
        knn.addDataset(smartphone2);
        var smartphone3 = new DataSet('smartphone', [5.9]);
        knn.addDataset(smartphone3);

        var tablet1 = new DataSet('tablet', [10]);
        knn.addDataset(tablet1);
        var tablet2 = new DataSet('tablet', [8]);
        knn.addDataset(tablet2);
        var tablet3 = new DataSet('tablet', [9.7]);
        knn.addDataset(tablet3);

        var tv1 = new DataSet('tv', [32]);
        knn.addDataset(tv1);
        var tv2 = new DataSet('tv', [50]);
        knn.addDataset(tv2);
        var tv3 = new DataSet('tv', [40]);
        knn.addDataset(tv3);
        var tv4 = new DataSet('tv', [54]);
        knn.addDataset(tv4);

        knn.classify([50]);
    },

    threeDimensionsSample: function () {
        var knn = new KNN(3);
        // Dimensionen:
        // 1: Gewicht in kg
        // 2: Höhe cm
        // 3: Geschwindigkeit kmh


        var dataset = new DataSet('turtle', [5, 10, 1]);
        knn.addDataset(dataset);
        var dataset = new DataSet('turtle', [5.5, 11, 1]);
        knn.addDataset(dataset);
        var dataset = new DataSet('turtle', [4.8, 9.5, 1]);
        knn.addDataset(dataset);
        var dataset = new DataSet('turtle', [5.2, 10, 1.1]);
        knn.addDataset(dataset);


        var dataset = new DataSet('lion', [250, 115, 60]);
        knn.addDataset(dataset);
        var dataset = new DataSet('lion', [220, 10, 55]);
        knn.addDataset(dataset);
        var dataset = new DataSet('lion', [252, 120, 62]);
        knn.addDataset(dataset);

        var dataset = new DataSet('giraffe', [1800, 550, 55]);
        knn.addDataset(dataset);
        var dataset = new DataSet('giraffe', [1860, 590, 57]);
        knn.addDataset(dataset);
        var dataset = new DataSet('giraffe', [1740, 550, 51]);
        knn.addDataset(dataset);
        var dataset = new DataSet('giraffe', [1810, 550, 52]);
        knn.addDataset(dataset);

        var dataset = new DataSet('ant', [0.002, 0.1, 3]);
        knn.addDataset(dataset);
        var dataset = new DataSet('ant', [0.0025, 0.1, 3.2]);
        knn.addDataset(dataset);
        var dataset = new DataSet('ant', [0.0015, 0.12, 2.9]);
        knn.addDataset(dataset);

        var dataset = new DataSet('elephant', [5500, 3.5, 40]);
        knn.addDataset(dataset);
        var dataset = new DataSet('elephant', [5563, 3.1, 41]);
        knn.addDataset(dataset);
        var dataset = new DataSet('elephant', [5463, 3.6, 38]);
        knn.addDataset(dataset);
        var dataset = new DataSet('elephant', [5560, 3.2, 41]);
        knn.addDataset(dataset);

        knn.classify([4999, 4, 35]);
    }
};

app.oneDimensionSample();
//app.threeDimensionsSample();
