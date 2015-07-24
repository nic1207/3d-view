var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container, stats;
var controls;
var camera, scene, renderer, h5mesh;
var mesh_mobile, mesh_bigdata, mesh_4g;
var linesGeo;
var pSystem;
var resolution = 100;

init();
animate();

function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        scene = new THREE.Scene();
        scene.matrixAutoUpdate = false;
        scene.add( new THREE.AmbientLight( 0x505050 ) );

        /*
        light1 = new THREE.SpotLight( 0xeeeeee, 3 );
        light1.position.x = 0;
        light1.position.y = 0;
        light1.position.z = 0;
        light1.castShadow = true;
        scene.add( light1 );
        */
       makeStarParticles();

        camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        //camera.position.z = -800;
        camera.position.set(0, 400, -800);

        controls = new THREE.OrbitControls( camera );
        controls.addEventListener( 'change', render );

        //cameraPerspectiveHelper = new THREE.CameraHelper( camera);
        //scene.add( cameraPerspectiveHelper );
        //scene.add(new THREE.AxisHelper(300));


        h5mesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 50, 50 ), new THREE.MeshBasicMaterial({
          //color: 0xffffff,
          map: THREE.ImageUtils.loadTexture( 'textures/final/h5_logo2.jpg' )
         } ) );
        h5mesh.position.z = 0;
        h5mesh.rotation.y = 1.5;
        scene.add( h5mesh );

        mesh_bigdata = new THREE.Mesh( new THREE.SphereGeometry( 30, 50, 50 ), new THREE.MeshBasicMaterial( {
          //color: 0x00ff00,
          map: THREE.ImageUtils.loadTexture( 'textures/final/big_data.jpg' ),
          wireframe: false
        } ) );
        mesh_bigdata.rotation.y = -30;
        scene.add(mesh_bigdata);

        mesh_4g = new THREE.Mesh( new THREE.SphereGeometry( 30, 50, 50 ), new THREE.MeshBasicMaterial( {
          //color: 0x00ff00,
          map: THREE.ImageUtils.loadTexture( 'textures/final/4G.jpg' ),
          wireframe: false
        } ) );
        mesh_4g.rotation.y = -30;
        //mesh_4g.rotation.x = 0;
        scene.add(mesh_4g);
         mesh_m1 = new THREE.Mesh( new THREE.SphereGeometry( 25, 50, 50 ), new THREE.MeshBasicMaterial( {
          //color: 0x00ff00,
          map: THREE.ImageUtils.loadTexture( 'textures/final/green_M.jpg' ),
          wireframe: false
        } ) );
        mesh_m1.position = new THREE.Vector3(-100,200,0);
        mesh_m1.rotation.y = -30;
        scene.add(mesh_m1);

        mesh_m2 = new THREE.Mesh( new THREE.SphereGeometry( 25, 50, 50 ), new THREE.MeshBasicMaterial( {
          //color: 0xff0000,
          map: THREE.ImageUtils.loadTexture( 'textures/final/red_M.jpg' ),
          wireframe: false
        } ) );
        mesh_m2.position = new THREE.Vector3(-300,-200,0);
        mesh_m2.rotation.y = -30;
        scene.add(mesh_m2);

        mesh_m3 = new THREE.Mesh( new THREE.SphereGeometry( 25, 50, 50 ), new THREE.MeshBasicMaterial( {
          //color: 0x0000ff,
          map: THREE.ImageUtils.loadTexture( 'textures/final/blue_M.jpg' ),
          wireframe: false
        } ) );
        mesh_m3.position = new THREE.Vector3(200,-200,0);
        mesh_m3.rotation.y = -30;
        scene.add(mesh_m3);

        //phone billboard
        mesh_phone = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 10, 10 ), new THREE.MeshBasicMaterial( {
          //color: 0x0000cc,
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_phone.png' ),
          transparent: true,
          depthTest:    true,
          depthWrite: false
        } ) );
        scene.add(mesh_phone);
        mesh_phone.lookAt(camera.position);

        //pad billboard
        mesh_pad = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_pad.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_pad);
        mesh_pad.lookAt(camera.position);

        //notebook billboard
        mesh_nb = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_nb.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_nb);
        mesh_nb.lookAt(camera.position);

        //aio billboard
        mesh_aio = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_aio.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_aio);
        mesh_aio.lookAt(camera.position);

        //ptv billboard
        mesh_ptv = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_ptv.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_ptv);
        mesh_ptv.lookAt(camera.position);

        //tv billboard
        mesh_tv = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_tv.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_tv);
        mesh_tv.lookAt(camera.position);

        //board billboard
        mesh_board = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_board.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_board);
        mesh_board.lookAt(camera.position);

        //board led
        mesh_led = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/s_led.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_led);
        mesh_led.lookAt(camera.position);

        //cloud1 billboard
        mesh_cloud1 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_work.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud1);
        mesh_cloud1.lookAt(camera.position);

        //cloud2 billboard
        mesh_cloud2 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_edu.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud2);
        mesh_cloud2.lookAt(camera.position);

        //cloud3 billboard
        mesh_cloud3 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_game.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud3);
        mesh_cloud3.lookAt(camera.position);

        //cloud4 billboard
        mesh_cloud4 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_social.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud4);
        mesh_cloud4.lookAt(camera.position);

        //cloud5 billboard
        mesh_cloud5 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_safety.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud5);
        mesh_cloud5.lookAt(camera.position);

        //cloud6 billboard
        mesh_cloud6 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_health.png' ),
          transparent: true,
          depthWrite: false
        } ) );
        scene.add( mesh_cloud6);
        mesh_cloud6.lookAt(camera.position);

        //cloud4 billboard
        mesh_cloud7 = new THREE.Mesh( new THREE.PlaneGeometry( 80, 80, 10, 10 ), new THREE.MeshBasicMaterial( {
          map: THREE.ImageUtils.loadTexture( 'textures/final/c_EC.png' ),
          transparent: true,
          depthWrite: false
        }));
        scene.add( mesh_cloud7);
        mesh_cloud7.lookAt(camera.position);

        camera.lookAt( h5mesh.position );

        //camera.lookAt(new THREE.Vector3(0, 0, 0));
        var r = new THREE.Vector3(1, 1, 1);
        drawCircleLine(r,200,0x3399ff);//0xFFCC66

         r = new THREE.Vector3(1, -0.2, 1);
        drawCircleLine(r,300,0xffcc66);//0x3399ff

         r = new THREE.Vector3(1, 0, 1);
        drawCircleLine(r,400,0xFFB8B8);

        r = mesh_m1.position;
        drawLine(h5mesh.position,r,0x00ff00);

        r = mesh_m2.position;
        drawLine(h5mesh.position,r,0xff0000);

        r = mesh_m3.position;
        drawLine(h5mesh.position,r,0x67F0EF);


        renderer = new THREE.WebGLRenderer( { antialias:false } );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.autoClear = false;
        // Setup our renderer
        renderer.sortObjects = false;
        renderer.generateMipmaps = false;

        //renderer.domElement.style.position = "relative";
        container.appendChild( renderer.domElement );

        stats = new Stats();
        container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );
        //document.addEventListener( 'windowResize', onWindowResize, false );
        document.addEventListener( 'mousemove', onDocumentMouseMove, true );
        document.addEventListener( 'mousedown', onDocumentMouseDown, true );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mousewheel', onMouseWheel, false );

        //masterContainer.addEventListener( 'click', onClick, true );
        //masterContainer.addEventListener( 'mousewheel', onMouseWheel, false );


      }

      /**
       * [constrain description]
       * @param  {[type]} v   [description]
       * @param  {[type]} min [description]
       * @param  {[type]} max [description]
       * @return {[type]}     [description]
       */
      function constrain(v, min, max) {
        if( v < min )
          v = min;
        else
          if( v > max )
            v = max;
        return v;
      }

      /**
       * [makeParticles description]
       * @return {[type]} [description]
       */
      function makeParticles(line,color) {
        var particlesGeo = new THREE.Geometry();
        //var particleColors = [];

        //var particleColor = new THREE.Color(color) ;
        var points = linesGeo.vertices;
        var particleCount = Math.floor(linesGeo.vertices.length)-1;
        //particleCount = constrain(particleCount,1,100);
        //console.log(linesGeo.size);
        //var particleSize = 50;
        //console.log(linesGeo.vertices);
        //console.log(points);
        for( var s=0; s<particleCount; s++ ) {
          //var desiredIndex = s / particleCount * points.length;
          //var rIndex = 0;//Math.floor(desiredIndex),0,points.length-1;
          //console.log(s,points[s]);

          var particle = points[s];
          particle.moveIndex = s;
          particle.nextIndex = s+1;
          if(particle.nextIndex >= points.length )
            particle.nextIndex = 0;
          particle.lerpN = 0;
          particle.path = points;
          particlesGeo.vertices.push( particle );
          //console.log(particleSize);
          //particle.size = particleSize;
          //console.log(particleColor);
          //particleColors.push( particleColor );

        }
        //console.log(particlesGeo.vertices.length);
        //particlesGeo.colors = particleColors;
        //particlesGeo.colors = 0xff0000;
        /*
        attributes = {
          size: { type: 'f', value: [] },
          customColor: { type: 'c', value: [] }
        };
        uniforms = {
          amplitude: { type: "f", value: 1.0 },
          color:{
            type: "c", value: new THREE.Color( 0xffffff )
          },
          texture:{
            type: "t", value: 0,
            texture: THREE.ImageUtils.loadTexture( "textures/final/particleA.png" )
          },
        };
        */
        //console.log(document.getElementById( 'fragmentshader' ).textContent);
        /*
        var shaderMaterial = new THREE.ShaderMaterial( {
          map: particleGraphic,
          color: 0xffffff,
          size: 60,
          //blending: THREE.NormalBlending,
          transparent:true,
          depthWrite: false
          //vertexColors: true
          //sizeAttenuation: true
        });
        */
        var particleGraphic = THREE.ImageUtils.loadTexture("textures/final/map_mask.png");
        attributes = {
          size: { type: 'f', value: [] },
          customColor: { type: 'c', value: [] }
        };

        uniforms = {
          amplitude: { type: "f", value: 1.0 },
          color:     { type: "c", value: new THREE.Color( 0xffffff ) },
          texture:   { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "textures/final/particleA.png" ) },
        };

        var particleMat = new THREE.ParticleBasicMaterial( {
          //uniforms:     uniforms,
          //attributes:     attributes,
          map: particleGraphic,
          color: color,
          size: 50,
          //blending: THREE.NormalBlending,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest:    true,
          //sizeAttenuation: true,

          //vertexColors: true,
          //sizeAttenuation: true
          transparent: true
        } );

        //particlesGeo.colors = particleColors;

        pSystem = new THREE.ParticleSystem( particlesGeo, particleMat);
        //pSystem.dynamic = true;
        line.add( pSystem );

        //var vertices = pSystem.geometry.vertices;
        //var values_size = attributes.size.value;
        //var values_color = attributes.customColor.value;

        //for( var v = 0; v < vertices.length; v++ ) {
          //values_size[ v ] = pSystem.geometry.vertices[v].size;
          //values_color[ v ] = particleColors[v];
        //}

        //console.log("zzzz");
        //scene.add( pSystem );
        //splineOutline.add( pSystem );
        /*
        pSystem.update = function() {

          // var time = Date.now()
          //console.log("XXXXXXXXXXX");
          for( var i in this.geometry.vertices ) {
            var particle = this.geometry.vertices[i];
            var path = particle.path;
            var moveLength = path.length;

            particle.lerpN += 0.0001;
            if(particle.lerpN > 1) {
              particle.lerpN = 0;
              particle.moveIndex = particle.nextIndex;
              particle.nextIndex++;
              if( particle.nextIndex >= path.length ) {
                particle.moveIndex = 0;
                particle.nextIndex = 1;
              }
            }
            var currentPoint = path[particle.moveIndex];
            var nextPoint = path[particle.nextIndex];
            particle.copy( currentPoint );
            particle.lerp( nextPoint, particle.lerpN );
          }
          this.geometry.verticesNeedUpdate = true
        };
        */
        /*
        var particles = new THREE.ParticleSystem( particlesGeo, new THREE.ParticleSystemMaterial( {
          size: 5,
          //color: 0xff0000

          map: THREE.ImageUtils.loadTexture("textures/map_mask.png"),
          color: 0xffffff,
          size: 60,
          blending: THREE.NormalBlending,
          transparent:true,
          depthWrite: false,
          vertexColors: true,
          sizeAttenuation: true

          uniforms:    uniforms,
          attributes:     attributes,
          vertexShader:   document.getElementById( 'vertexshader' ).textContent,
          fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

          blending:     THREE.AdditiveBlending,
          depthTest:    true,
          depthWrite:   false,
          transparent:  true,
          // sizeAttenuation: true,
        } ) );
        */
        //scene.add( particles );
      }

      /**
       * [makeStarParticles description]
       * @return {[type]} [description]
       */
      function makeStarParticles() {

        var geometry = new THREE.Geometry();
        for ( var i = 0; i < 10000; i ++ ) {

          var vertex = new THREE.Vector3();
          vertex.x = THREE.Math.randFloatSpread( 2000 );
          vertex.y = THREE.Math.randFloatSpread( 2000 );
          vertex.z = THREE.Math.randFloatSpread( 2000 );
          geometry.vertices.push( vertex );
        }

        var particles = new THREE.ParticleSystem( geometry, new THREE.ParticleSystemMaterial( {
          color: 0x888888
        } ) );
        scene.add( particles );
      }


      function createCurvePath(start, end, elevation) {
        var distanceBetweenCountryCenter = start.clone().subSelf(end).length();
        var distanceHalf = distanceBetweenCountryCenter * 0.5;
        var startAnchor = start;
        //var mid = start.clone().lerpSelf(end,0.5);
        //  midpoint for the curve
        var mid = start.clone().lerpSelf(end,0.5);
        var midLength = mid.length()
        mid.normalize();
        mid.multiplyScalar( midLength + distanceBetweenCountryCenter * 0.7 );
        //  the normal from start to end
        var normal = (new THREE.Vector3()).sub(start,end);
        normal.normalize();
        var midStartAnchor = mid.clone().addSelf( normal.clone().multiplyScalar( distanceHalf ) );
        //var middle3 = globe.translateCordsToPoint(mid.lat(), mid.lon(), elevation);

        //var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
        var splineCurveA = new THREE.CubicBezierCurve3( start, startAnchor, midStartAnchor, mid);
        // var curveCubic = new THREE.CubicBezierCurve3(start3, start3_control, end3_control, end3);

        //var cp = new THREE.CurvePath();
        //cp.add(splineCurveA);
        //cp.add(curveCubic);
        return splineCurveA;
      }

      /**
       * [drawLine description]
       * @param  {[type]} p [description]
       * @return {[type]}   [description]
       */
      function drawLine(start,end,color) {
        linesGeo = new THREE.Geometry();
        linesGeo.vertices.push(start);
        linesGeo.vertices.push(end);
        var material = new THREE.LineBasicMaterial({
          color: color,
           linewidth: 1
        });
        var line = new THREE.Line(linesGeo, material);
        scene.add(line);
      }
      /**
       * [drawCircleLine description]
       * @return {[type]} [description]
       */
      function drawCircleLine(r,amplitude,color) {
        var numPoints = 100;

        //  make a final mesh out of this composite
       // var resolution = 100;
        var size = 360 / resolution;
        //var lineColors = [];

        linesGeo = new THREE.Geometry();

        for(var i = 0; i <= resolution; i++) {
          var segment = ( i * size ) * Math.PI / 180;
          linesGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * amplitude*r.x, Math.cos( segment ) * amplitude*r.y *1, Math.sin( segment ) * amplitude*r.z ) ) );
          //linesGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( x,y, z ) ) );
        }

         var material = new THREE.LineBasicMaterial({
          color: color,
          opacity: 1.0,
          blending: THREE.AdditiveBlending,
          transparent:true,
          depthWrite: false,
          //vertexColors: true,
          linewidth: 1
        });


        /*
        //  end of the line
        //var end = importer.center;
        //var cp = createCurvePath(mesh_phone.position, mesh_phone.position, 100);

        var material = new THREE.LineBasicMaterial({
          color: 0x3399FF,
          opacity: 1.0,
          blending: THREE.AdditiveBlending,
          transparent:true,
          depthWrite: false,
          //vertexColors: true,
          linewidth: 1
        });

        linesGeo = new THREE.Geometry();
        var resolution = 100;
        var amplitude = 300;
        var size = 360 / resolution;
        for(var i = 0; i <= resolution; i++) {
          var segment = ( i * size ) * Math.PI / 180;
          linesGeo.vertices.push( new THREE.Vertex( new THREE.Vector3( Math.cos( segment ) * amplitude, 0, Math.sin( segment ) * amplitude ) ) );
        }
        */
        //var splinePoints = cp.getPoints(numPoints);
        //console.log(splinePoints);
        //for(var i = 0; i < splinePoints.length; i++)  {
        //  linesGeo.vertices.push(splinePoints[i]);
        //}


        var line = new THREE.Line(linesGeo, material);
        //line.rotation.x = r.x;
        //line.rotation.y = r.y;
        //line.rotation.z = r.z;
        //scene.add(line)


        //line.renderDepth = false;
        makeParticles(line,color);
        //line.affectedCountries = affectedCountries;
        scene.add(line);


      }

      /**
       * [onWindowResize description]
       * @param  {[type]} event [description]
       * @return {[type]}       [description]
       */
      function onWindowResize( event ) {

        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
      }

      //
      function animate() {
        requestAnimationFrame( animate );
        render();
        stats.update();
      }

      function render() {

        //var r = Date.now() * 0.0005;
        var r = Date.now() * 0.001;


        //h5mesh.position.z = 700;// * Math.sin( r );
        //h5mesh.rotation.y += 0.001;
        //mesh.rotation.y = 1.5;
        //console.log(h5mesh.rotation.y);
        var t = r/3;
        mesh_bigdata.position.x = Math.cos( t ) * 200;//bigdata
        mesh_bigdata.position.y = Math.cos( t ) * 200;//bigdata
        mesh_bigdata.position.z = Math.sin( t ) * 200;//bigdata

        //mesh_bigdata.rotation.z = 180;//bigdata
        mesh_4g.position.x = Math.cos( t ) * -200;//bigdata
        mesh_4g.position.y = Math.cos( t ) * -200;//bigdata
        mesh_4g.position.z = Math.sin( t ) * -200;//bigdata

        //
        //console.log(r);
        t= r/5;
        //console.log(t);
        //console.log(t );
        mesh_phone.position.x = Math.cos( t ) * 300 ;
        mesh_phone.position.y = Math.cos( t ) * 300 * -0.2;
        mesh_phone.position.z = Math.sin( t ) * 300;
        mesh_phone.lookAt(camera.position);

        t+=150;
        mesh_pad.position.x = Math.cos( t ) * 300 ;
        mesh_pad.position.y = Math.cos( t ) * 300 * -0.2;
        mesh_pad.position.z = Math.sin( t ) * 300;
        mesh_pad.lookAt(camera.position);

        t+=150;
        mesh_nb.position.x = Math.cos( t ) * 300 ;
        mesh_nb.position.y = Math.cos( t ) * 300  * -0.2;
        mesh_nb.position.z = Math.sin( t ) * 300;
        mesh_nb.lookAt(camera.position);

        t+=150;
        mesh_aio.position.x = Math.cos( t ) * 300 ;
        mesh_aio.position.y = Math.cos( t ) * 300  * -0.2;
        mesh_aio.position.z = Math.sin( t ) * 300;
        mesh_aio.lookAt(camera.position);

        t+=150;
        mesh_ptv.position.x = Math.cos( t ) * 300 ;
        mesh_ptv.position.y = Math.cos( t ) * 300  * -0.2;
        mesh_ptv.position.z = Math.sin( t ) * 300;
        mesh_ptv.lookAt(camera.position);

        t+=150;
        mesh_tv.position.x = Math.cos( t ) * 300 ;
        mesh_tv.position.y = Math.cos( t ) * 300 * -0.2 ;
        mesh_tv.position.z = Math.sin( t ) * 300;
        mesh_tv.lookAt(camera.position);

        t+=150;
        mesh_board.position.x = Math.cos( t ) * 300 ;
        mesh_board.position.y = Math.cos( t ) * 300 * -0.2;
        mesh_board.position.z = Math.sin( t ) * 300;
        mesh_board.lookAt(camera.position);

        t+=150;
        mesh_led.position.x = Math.cos( t ) * 300 ;
        mesh_led.position.y = Math.cos( t ) * 300  * -0.2;
        mesh_led.position.z = Math.sin( t ) * 300;
        mesh_led.lookAt(camera.position);


        var t = r/5;

        //clouds
        mesh_cloud1.position.x = Math.cos( t ) * 400;
        //mesh_cloud1.position.y = Math.cos( t ) * -200;
        mesh_cloud1.position.z = Math.sin( t ) * 400;
        mesh_cloud1.lookAt(camera.position);

        t+=150;
        mesh_cloud2.position.x = Math.cos( t ) * 400;
        //mesh_cloud2.position.y = Math.cos( t ) * 150;
        mesh_cloud2.position.z = Math.sin( t ) * 400;
        mesh_cloud2.lookAt(camera.position);

        t+=150;
        mesh_cloud3.position.x = Math.cos( t ) * 400;
        //mesh_cloud3.position.y = Math.sin( t ) * -200;
        mesh_cloud3.position.z = Math.sin( t ) * 400;
        mesh_cloud3.lookAt(camera.position);

        t+=150;
        mesh_cloud4.position.x = Math.cos( t ) * 400;
        //mesh_cloud4.position.y = Math.sin( t ) * 250;
        mesh_cloud4.position.z = Math.sin( t ) * 400;
        mesh_cloud4.lookAt(camera.position);

        t+=150;
        mesh_cloud5.position.x = Math.cos( t ) * 400;
        //mesh_cloud5.position.y = Math.sin( t ) * -100;
        mesh_cloud5.position.z = Math.sin( t ) * 400;
        mesh_cloud5.lookAt(camera.position);

        t+=150;
        mesh_cloud6.position.x = Math.cos( t ) * 400;
        //mesh_cloud6.position.y = Math.sin( t ) * -250;
        mesh_cloud6.position.z = Math.sin( t ) * 400;
        mesh_cloud6.lookAt(camera.position);

        t+=150;
        mesh_cloud7.position.x = Math.cos( t ) * 400;
        //mesh_cloud7.position.y = Math.sin( t ) * 150;
        mesh_cloud7.position.z = Math.sin( t ) * 400;
        mesh_cloud7.lookAt(camera.position);

        //if(pSystem)
        //  pSystem.update();

        //drawline();
        //camera.updateProjectionMatrix();
        camera.lookAt( h5mesh.position );

        renderer.clear();

        renderer.setViewport( 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.render( scene, camera );
}
