$vm_box = "flomesh/ubuntu20.04-k3s1.20"
$k3s_ip = "192.168.77.10"

Vagrant.configure("2") do |config|
	config.vm.define "dubbo-demo", primary: true do |k3s|
		k3s.vm.box = $vm_box

		k3s.vm.box_check_update = false
	  
		k3s.vm.hostname = "dubbo-demo"
	  
		k3s.vm.network "private_network", ip: $k3s_ip

		k3s.vm.provider "virtualbox" do |vb|
			vb.name = "dubbo-demo"
			vb.memory = 8192 #$vm_memory
			vb.cpus = 2 #$vm_cpus
			vb.gui = false
		end
	end
end
