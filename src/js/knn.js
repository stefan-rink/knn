function KNN(dimensions) {
    this.dimensions = dimensions;
    this.datasets = [];


    /**
     * @param dataset Instanz der Klasse DataSet, deren Anzahl an Parametern der Anzahl in
     *     Dimensionen des KNN entsprechen muss
     */
     this.addDataset = function (dataset) {
        // Prüfen, ob gültige Datensatz-Instanz
        if (!(dataset instanceof DataSet)) {
            return false;
        }

        // Anzahl Parameter muss mit der Anzahl an Dimensionen übereinstimmen
        if (this.dimensions !== dataset.props.length) {
            throw 'Amount of Params does not match the amount of the KNN´s dimensions';
        }

        // Datensatz aufnehmen
        this.datasets.push(dataset);
    };

    this.getDatasets = function () {
        return this.datasets;
    };

    this.getDataset = function (index) {
        if (index < this.datasets.length && index > -1) {
            return this.datasets[index];
        }
        return false;
    };

    /**
     * Einen Datensatz aus dem Speicher/'Gedächtnis' löschen
     * @param index
     * @return {boolean}
     */
    this.deleteDataset = function (index) {
        if (index < this.datasets.length && index > -1) {
            this.datasets.splice(index, 1);
        } else {
            return false;
        }
    };

    /**
     * Klassifiziert einen Datensatz
     *
     * @param props Array mit Parametern eines Datensatzes, die klassifiziert werden sollen
     * @param add Boolean, der angibt, ob der geprüfte Datensatz zu den trainierten Daten
     *     hinzugefügt wird
     */
    this.classify = function (props, add) {
        add = add || true;


        if (typeof add !== 'boolean' || !Array.isArray(props)) {
            return false;
        }

        // Anzahl Punkten, die über die Rückgabe entscheiden
        var k = Math.round(Math.sqrt(this.datasets.length));

        // Speichert die k nächsten Werte
        var nearest = [];

        // Alle 'gelernten' Datensätze durchlaufen
        for (var i = 0; i < this.datasets.length; i++) {
            // Die Distanz des zu klassifizierenden Vektors und dem akutell Iteriertem Datensatz
            // ausrechnen
            var distance = this.distance(props, this.datasets[i].props);

            // Aktueller maximaler Wert im Array
            var max = []
            for (var j = 0; j < nearest.length; j++) {
                if (max['value'] < nearest[j][1] || max.length === 0) {
                    max['value'] = nearest[j][1];
                    max['key'] = j;
                }
            }

            // Ist die Distanz kleiner als der maximale der Werte in der Liste
            if (max['value'] > distance || max.length == 0) {
                // Prüfen, ob bereits die maximale Anzahl an Elementen ausgewertet wird
                if (nearest.length >= k) {
                    // Den größten Wert aus der Liste überschreiben
                    nearest[max['key']] = [this.datasets[i].label, distance];
                } else {
                    // Neues Element anhängen
                    nearest.push([this.datasets[i].label, distance]);
                }
            }
        }

        // Beinhaltet die Anzahl an 'votenden' labels.
        // Wird benöigt, um später den Durchschnittlichen Abstand zu ermitteln
        var nearestLabelsAmount = {};

        // Die Rückgaben der nächsten Punkte nacht ihren Labels mit Gewichtung auswerten
        var nearestLabels = {};
        for (var i = 0; i < nearest.length; i++) {
            if (nearestLabels[nearest[i][0]] > 0) {
                nearestLabels[nearest[i][0]] += nearest[i][1];
            } else {
                nearestLabels[nearest[i][0]] = nearest[i][1];
            }

            if (nearestLabelsAmount[nearest[i][0]] > 0) {
                nearestLabelsAmount[nearest[i][0]]++;
            } else {
                nearestLabelsAmount[nearest[i][0]] = 1;
            }
        }

        // Durch die Anzahl der Vorkommen teilen, um die durchschnittliche Distanz zu erhalten
        for (var property in nearestLabels) {
            if (nearestLabels.hasOwnProperty(property))  {
                nearestLabels[property] /= nearestLabelsAmount[property];
            }
        }

        var minLabel = null;
        for (var property in nearestLabels) {
            if (nearestLabels.hasOwnProperty(property))  {
                if (minLabel === null || minLabel.value > nearestLabels[property]) {
                    minLabel = {
                        'label': property,
                        'value': nearestLabels[property]
                    };
                }
            }
        }

        return minLabel.label || false;
    };

    /**
     * KNN Objekt um 'distance' erweitern
     * Die Methode berechnet den Abstand zweier Vektoren
     *
     * @param vector1
     * @param vector2
     * @return {*}
     */
    this.distance = function (vector1, vector2) {
        // Beide Vektoren müssen ein Array sein
        if (!Array.isArray(vector1) || !Array.isArray(vector2)) {
            return false;
        }

        // Beide Vektoren brauchen die selbe Anzahl an Dimensionen
        if (vector1.length !== vector2.length) {
            return false;
        }

        // Hilfsvariable
        var x = 0;

        // Distanz berechnen
        for (var i = 0; i < vector1.length; i++) {
            x += Math.pow(vector1[i] - vector2[i], 2);
        }
        return Math.sqrt(x);
    };

}
/**
 *
 * @param label Klassifizierung des Datensatzes
 * @param props Array mit einem Parameter pro Dimension des KNN
 * @constructor
 */
function DataSet(label, props) {
    // Datentypen der Parameter prüfen
    if (typeof label !== 'string' || !Array.isArray(props)) {
        throw 'Parameters not valid.';
    }

    this.label = label;
    this.props = props;
}
