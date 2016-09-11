class PerspectiveTransform extends CachedTransform {
    aspectRatio: number;
    fieldOfViewInDegrees: number;
    nearDistance: number;
    farDistance: number;

    constructor (aspectRatio, fieldOfViewInDegrees, nearDistance, farDistance) {
        super();

        this.aspectRatio = aspectRatio;
        this.fieldOfViewInDegrees = fieldOfViewInDegrees;
        this.nearDistance = nearDistance;
        this.farDistance = farDistance;
    }

    computeMatrix() {
        this.transform.perspective(this.aspectRatio, this.fieldOfViewInDegrees,
            this.nearDistance, this.farDistance);
    }
}
