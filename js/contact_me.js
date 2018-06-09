$(function() {

    $("#buscar").click(function() {
      var dni = document.getElementById('dni1').value;
      console.log(dni);
      $.ajax({
        type:'GET',
        url:"http://18.219.10.95:1706/existePaciente="+dni,
        success: function(data, success){
          console.log(data); //El json de respuesta
          console.log(data["data"]); //La data que se recibe
          if (data["data"].length>0) {
            //document.getElementById('nombreEncontrado').innerHTML=data["data"][0]["nombre_paciente"];
            document.getElementById('encontrado').innerHTML="PACIENTE ENCONTRADO";
            document.getElementById('nombreEncontrado').innerHTML=data["data"][0]["nombre_paciente"];
            document.getElementById('apellidoEncontrado').innerHTML=data["data"][0]["apellido_paciente"];
            document.getElementById('idEncontrado').innerHTML=data["data"][0]["id_pacienteint"];
            document.getElementById('numEncontrado').innerHTML=data["data"][0]["numero_historial_clinico"];
            document.getElementById('seguroEncontrado').innerHTML=data["data"][0]["numero_seguro_social"];
            document.getElementById('telefonoEncontrado').innerHTML=data["data"][0]["numero_telefono"];
            document.getElementById('domicilioEncontrado').innerHTML=data["data"][0]["domicilio_habitual"];
            document.getElementById('nn').innerHTML=" Nombres y Apellidos: ";
            document.getElementById('idd').innerHTML=" Id del paciente: ";
            document.getElementById('num').innerHTML=" N° Historial Medico: ";
            document.getElementById('seg').innerHTML=" N° Seguro Social: ";
            document.getElementById('tel').innerHTML=" Telefono: ";
            document.getElementById('domicilios').innerHTML=" Domicilio: ";
            document.getElementById('crear').innerHTML="Si desea crear una cita...";
            document.getElementById('crealo').innerHTML="<a class=''nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger' href='#contact'>Click AQUI</a>";
          }else {
            document.getElementById('encontrado').innerHTML="No se encontro al paciente";
            document.getElementById('crear').innerHTML="Si desea registrarlo...";
            document.getElementById('crealo').innerHTML="<a class=''nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger' href='#about'>Click AQUI</a>";
            document.getElementById('nombreEncontrado').innerHTML="";
            document.getElementById('apellidoEncontrado').innerHTML="";
            document.getElementById('idEncontrado').innerHTML="";
            document.getElementById('numEncontrado').innerHTML="";
            document.getElementById('seguroEncontrado').innerHTML="";
            document.getElementById('telefonoEncontrado').innerHTML="";
            document.getElementById('domicilioEncontrado').innerHTML="";
            document.getElementById('nn').innerHTML="";
            document.getElementById('idd').innerHTML="";
            document.getElementById('num').innerHTML="";
            document.getElementById('seg').innerHTML="";
            document.getElementById('tel').innerHTML="";
            document.getElementById('domicilios').innerHTML="";
          }
        }
      });
      return false;
    });


    $("#registrar").click(function() {
        var paciente = new Object();
        paciente.nombre = document.getElementById('nombre').value;
        paciente.apellido = document.getElementById('apellido').value;
        paciente.domicilio = document.getElementById('domicilio').value;
        paciente.provincia = document.getElementById('provincia').value;
        paciente.telefono = document.getElementById('telefono').value;
        paciente.numero_historial_clinico = document.getElementById('numero_historial_clinico').value;
        paciente.numero_seguro_social = document.getElementById('numero_seguro_social').value;
        paciente.observaciones = document.getElementById('observaciones').value;
        paciente.dni = document.getElementById('dni').value;
        console.log(JSON.stringify(paciente));
        $.ajax({
          type:'POST',
          url:"http://18.219.10.95:1706/crearPaciente",
          data: JSON.stringify(paciente),
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
          },
          success: function(data, success){
            alert("Registrado");
            console.log(success);
          }
        });
      });


    $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });

    $("#crearCita").click(function() {
      console.log("AAAAAAAAAA");
            var fechaFormulario = document.getElementById("fecha");

              var cita = new Object();
              cita.fecha = document.getElementById('fecha').value;
              cita.hora = document.getElementById('hora').value;
              cita.id_medico = document.getElementById('_123').value;
              cita.id_paciente = document.getElementById('_1234').value;
              console.log(JSON.stringify(cita));
              $.ajax({
                type:'POST',
                url:"http://18.219.10.95:1706/separarCita",
                data: JSON.stringify(cita),
                headers:{
                  "Accept":"application/json",
                  "Content-Type":"application/json"
                },
                success: function(data, success){
                  alert("Cita Creada");
                  console.log(success);
                }
              });
              return false;
          });

      //Listar Doctores////////////////////////////////////////////////////////////////////////////////
    $(function() {
      $.ajax({
        type:'GET',
        url:"http://18.219.10.95:1706/ListDoctors",
        success: function(data, success){
          console.log(data); //El json de respuesta
          console.log(data["data"]); //La data que se recibe
          var arreglo = [];
          var x = document.getElementById("_123");
          for (var i = 0; i < data["data"].length; i++) {
            var miOption=document.createElement("option");
            miOption.text = data["data"][i]["nombre_medico"];
            miOption.setAttribute("value",data["data"][i]["id_medico"]);
            x.add(miOption);
          }
        }
      });

      return false;
    });

    //Listar Pacientes ////////////////////////////////////////////////////////////////////////////////
    $(function() {
      $.ajax({
        type:'GET',
        url:"http://18.219.10.95:1706/ListPatients",
        success: function(data, success){
          //console.log(data); //El json de respuesta
          //console.log(data["data"]); //La data que se recibe
          var arreglo = [];
          var x = document.getElementById("_1234");
          for (var i = 0; i < data["data"].length; i++) {
            var miOption=document.createElement("option");
            miOption.text = data["data"][i]["nombre_paciente"];
            miOption.setAttribute("value",data["data"][i]["id_pacienteint"]);
            x.add(miOption);
          }
        }
      });
      return false;
    });

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
});
