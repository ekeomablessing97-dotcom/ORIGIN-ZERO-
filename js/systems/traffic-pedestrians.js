window.TrafficPedestrianSystem = {
    vehicles: [],
    pedestrians: [],

    init: function(scene) {
        // Create simple moving traffic proxy boxes along Neo-Lagos roads
        const carMat = new BABYLON.StandardMaterial("carMat", scene);
        carMat.emissiveColor = new BABYLON.Color3(1.0, 0.2, 0.0); // Neon tail lights / body

        for (let i = 0; i < 6; i++) {
            const car = BABYLON.MeshBuilder.CreateBox("trafficCar_" + i, { width: 2.2, height: 1.2, depth: 4.5 }, scene);
            car.position = new BABYLON.Vector3(-6 + (i * 3), 0.6, -80 + (i * 25));
            car.material = carMat;
            car.direction = i % 2 === 0 ? 1 : -1;
            this.vehicles.push(car);
        }

        // Create simple walking pedestrian proxies in the technology/commercial districts
        const pedMat = new BABYLON.StandardMaterial("pedMat", scene);
        pedMat.emissiveColor = new BABYLON.Color3(0.0, 0.8, 1.0);

        for (let j = 0; j < 4; j++) {
            const ped = BABYLON.MeshBuilder.CreateCapsule("pedestrian_" + j, { radius: 0.4, height: 1.8 }, scene);
            ped.position = new BABYLON.Vector3(30 + (j * 5), 0.9, 20 + (j * 10));
            ped.material = pedMat;
            ped.p_range = { min: 10, max: 70 };
            ped.speed = 1.5;
            this.pedestrians.push(ped);
        }

        // Animation loop for traffic and pedestrians
        scene.registerBeforeRender(() => {
            const dt = scene.getEngine().getDeltaTime() / 1000;

            // Move traffic
            this.vehicles.forEach(car => {
                car.position.z += 12 * car.direction * dt;
                if (car.position.z > 150) car.position.z = -150;
                if (car.position.z < -150) car.position.z = 150;
            });

            // Move pedestrians back and forth
            this.pedestrians.forEach(ped => {
                ped.position.x += ped.speed * dt;
                if (ped.position.x > ped.p_range.max || ped.position.x < ped.p_range.min) {
                    ped.speed *= -1;
                }
            });
        });
    }
};
