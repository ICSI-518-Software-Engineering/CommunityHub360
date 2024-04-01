const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// const mongoString="mongodb+srv://manandevani007:XNReRhFTw9izg21j@propadmn.vpitmnh.mongodb.net/"
app.use(express.json());
const mongoString = "mongodb+srv://abdullearn18:abdullearn18@cluster0.rcrkkkv.mongodb.net/"

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

app.use(express.json());
app.use(cors())
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const User = require('./Schema/Users');
const Announcement= require('./Schema/Annoucements');
const MaintenanceRequest = require('./Schema/MaintenanceRequestSchema');
const GuestParking = require('./Schema/GuestParkingSchema'); 
const TenantParking = require('./Schema/TenantParkingSchema')

const YOUR_DOMAIN = 'http://localhost:9000';
// SignUP APIS
app.post('/createUser', async (req, res) => {

    // console.log("in saving",req.body)
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
        console.log("User saved in db")
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        // console.log(user)
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})



app.get('/getTenants', async (req, res) => {
    try {
        const tenants = await User.find({ role: 'tenant' });
        res.send(tenants);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/deleteTenant/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.findByIdAndDelete(userId);
        await TenantParking.deleteMany({ tenantId: userId });
        await MaintenanceRequest.deleteMany({ tenantId: userId });
        await GuestParking.deleteMany({ requestedBy: userId });
        
        if (result) {
            res.send({ message: 'Tenant deleted successfully' });
        } else {
            res.status(404).send({ message: 'Tenant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


app.post('/acceptTenant', async (req, res) => {
    try {
        const tenant = await User.findByIdAndUpdate(req.body._id, { isAccepted: true }, { new: true });
        if (tenant) {
            res.send(tenant);
        } else {
            res.status(404).send({ message: 'Tenant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//manage Announcements
app.post('/createAnncc', async (req, res) => {
    try {
        const { header, description } = req.body;
        const newAnnouncement = new Announcement({ header, description });
        await newAnnouncement.save();
        res.status(201).send(newAnnouncement);
    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).send(error);
    }
});


app.get('/getAnnouncements', async (req, res) => {
    try {
        const announcements = await Announcement.find({});
        res.send(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).send(error);
    }
});

app.delete('/deleteAnnouncement/:id', async (req, res) => {
    try {
        const result = await Announcement.findByIdAndDelete(req.params.id);
        if (result) {
            res.send({ message: 'Announcement deleted successfully' });
        } else {
            res.status(404).send({ message: 'Announcement not found' });
        }
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).send(error);
    }
});

app.get('/getAnnouncements', async (req, res) => {
    try {
        // Fetch all announcements and sort them by createdDate in descending order (most recent first)
        const announcements = await Announcement.find({}).sort({ createdDate: -1 });
        res.send(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).send(error);
    }
});

// Maintance Requests

app.post('/maintenanceRequests', async (req, res) => {
    try {
        const newRequest = new MaintenanceRequest(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        console.error('Error creating maintenance request:', error);
        res.status(500).json({ message: 'Error creating maintenance request', error: error });
    }
});

app.get('/unresolvedMainReq', async (req, res) => {
    try {
        const unresolvedRequests = await MaintenanceRequest.find({ isresolved: false })
            .populate('tenantId', 'fname lname HouseNum -_id')
            .exec();

        
        res.json(unresolvedRequests.map(req => ({
            ...req._doc,
            availableDates: req.availableDates.map(date => ({
                date: date.date, 
                fromTime: date.fromTime,
                toTime: date.toTime
            }))
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Get maintenance requests for a specific tenant
app.get('/maintenanceRequests/tenant/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const requests = await MaintenanceRequest.find({ tenantId: tenantId });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update the resolved status of a maintenance request
app.put('/maintenanceRequests/update/:requestId', async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const request = await MaintenanceRequest.findById(requestId);

        if (request) {
            // Toggle isresolved status
            request.isresolved.status = !request.isresolved.status;

            // If it's being marked as resolved, update resolvedDate
            if (request.isresolved.status) {
                request.isresolved.resolvedDate = new Date();
            } else {
                // If it's being marked as unresolved, you may want to clear the resolvedDate
                request.isresolved.resolvedDate = null;
            }

            await request.save();
            res.json(request);
        } else {
            res.status(404).send('Maintenance request not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/resolvedMainReq', async (req, res) => {
    try {
        const resolvedRequests = await MaintenanceRequest.find({ 'isresolved.status': true })
            .sort({ 'isresolved.resolvedDate': -1 })
            .populate('tenantId');

        res.json(resolvedRequests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.post('/guestParking/request', async (req, res) => {
    try {
        const { carType, VehicleNum, Name, requestedBy, requestedFrom, requestedTo } = req.body;

        const newGuestParkingRequest = new GuestParking({
            carType,
            VehicleNum,
            Name,
            requestedBy: requestedBy,
            requestedFrom,
            requestedTo
        });

        await newGuestParkingRequest.save();

        res.status(201).json(newGuestParkingRequest);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');
    }
});

// Fetch all guest parking requests
app.get('/guestParking/requests', async (req, res) => {
    try {
        const requests = await GuestParking.find({ isAssigned: false });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Fetch all assigned parkings
app.get('/guestParking/assigned', async (req, res) => {
    try {
        const assignedParkings = await GuestParking.find({ isAssigned: true });
        res.json(assignedParkings);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Assign a parking lot number to a request
app.put('/guestParking/assign/:requestId', async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { LotNum } = req.body;

        const request = await GuestParking.findById(requestId);
        if (request) {
            request.LotNum = LotNum;
            request.isAssigned = true;
            await request.save();
            res.json(request);
        } else {
            res.status(404).send('Request not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Fetch all guest parking requests for a specific tenant
app.get('/guestParking/tenantRequests/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const requests = await GuestParking.find({ requestedBy: tenantId });
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



app.get('/unassignedParkingSpaces', async (req, res) => {
    try {
        // Fetch the list of parking spaces from the database
        const parkingSpaces = await TenantParking.find({});
        const assignedParkingSpaces = parkingSpaces.map((space) => space.LotNum);

        const totalParkingSpaces = 15; // Total number of parking spaces

        // Generate an array of unassigned parking spaces (LotNum values)
        const unassignedSpaces = Array.from({ length: totalParkingSpaces }, (_, index) => {
            const LotNum = index + 1;
            
            // Check if the LotNum exists in the database and is not assigned
            const isAssigned = assignedParkingSpaces.includes(LotNum);
            
            return { LotNum, isAssigned: isAssigned }; // Mark as unassigned if not in the database
        });
        // console.log(unassignedSpaces);
        res.json(unassignedSpaces);
    } catch (error) {
        console.error('Error fetching unassigned parking spaces:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getValidTenants', async (req, res) => {
    try {
        const validTenants = await User.find({ role: 'tenant', isAccepted: true });
        res.json(validTenants);
    } catch (error) {
        console.error('Error fetching valid tenants:', error);
        res.status(500).json({ message: 'Error fetching valid tenants', error: error });
    }
});

app.post('/assignTParking', async (req, res) => {
    const { tenantId, LotNum } = req.body;
    try {
        // Check if the parking space exists
        let parkingSpace = await TenantParking.findOne({ LotNum });

        if (!parkingSpace) {
            // If parking space doesn't exist, create a new one
            parkingSpace = new TenantParking({
                LotNum,
                tenantId,
                isAssigned: true,
                assignedBy: req.body.assignedBy._id,
                assignedDate: new Date()
            });

            await parkingSpace.save();
            return res.status(200).json({ message: 'Parking space assigned successfully.' });
        }

        if (parkingSpace.isAssigned) {
            // Parking space is already assigned
            return res.status(400).json({ message: 'Parking space is already assigned.' });
        }

        // Assign the parking space
        parkingSpace.tenantId = tenantId;
        parkingSpace.isAssigned = true;
        parkingSpace.assignedBy = req.user._id;
        parkingSpace.assignedDate = new Date();
        console.log("saviii")
        await parkingSpace.save();

        res.status(200).json({ message: 'Parking space assigned successfully.' });
    } catch (error) {
        console.error('Error assigning parking space:', error);
        res.status(500).json({ message: 'Error assigning parking space', error: error });
    }
});


app.get('/getAssignedParking', async (req, res) => {
    try {
        // Assuming you have a model for assigned parking with a reference to the tenant model, you can use the populate method to fetch tenant details
        const assignedParking = await TenantParking.find().populate('tenantId');

        // Return the assigned parking data with populated tenant details as JSON
        // console.log(assignedParking)
        res.status(200).json(assignedParking);
    } catch (error) {
        console.error('Error fetching assigned parking:', error);
        res.status(500).json({ message: 'Error fetching assigned parking', error: error });
    }
});


app.post('/unassignTParking', async (req, res) => {
    const { tenantId, LotNum } = req.body;

    try {
        // Find the parking space with the specified LotNum
        const parkingSpace = await TenantParking.findOne({ LotNum });

        if (!parkingSpace) {
            // Parking space not found
            return res.status(400).json({ message: 'Parking space not found.' });
        }

        // Check if the parking space is already unassigned
        if (!parkingSpace.isAssigned) {
            return res.status(400).json({ message: 'Parking space is already unassigned.' });
        }

        // Check if the parking space is assigned to the specified tenant
        if (parkingSpace.tenantId.toString() !== tenantId) {
            return res.status(400).json({ message: 'Parking space is assigned to a different tenant.' });
        }

        // Delete the parking space
        await TenantParking.deleteOne({ LotNum })

        res.status(200).json({ message: 'Parking space deleted successfully.' });
    } catch (error) {
        console.error('Error deleting parking space:', error);
        res.status(500).json({ message: 'Error deleting parking space', error: error });
    }
});

app.get('/api/tenantParking/:tenantId', async (req, res) => {
    try {
        const tenantId = req.params.tenantId;
        const parkings = await TenantParking.find({ tenantId: tenantId, isAssigned: true });

        if (!parkings || parkings.length === 0) {
            return res.status(404).send('No parking details found for the specified tenant.');
        }

        res.send(parkings);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});

app.post('/create-checkout-session', async (req, res) => {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
  
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
  });
  
  app.post('/create-portal-session', async (req, res) => {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const returnUrl = YOUR_DOMAIN;
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  
    res.redirect(303, portalSession.url);
  });
  
  app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    (request, response) => {
      let event = request.body;
      const endpointSecret = 'whsec_12345';
      if (endpointSecret) {
  
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
      let subscription;
      let status;
      // Handle the event
      switch (event.type) {
        case 'customer.subscription.trial_will_end':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        case 'customer.subscription.deleted':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        case 'customer.subscription.created':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        case 'customer.subscription.updated':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
      response.send();
    }
  );


  
app.post('/change-password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.password !== oldPassword) {
            return res.status(400).send({ message: 'Incorrect old password' });
        }
        user.password = newPassword;
        await user.save();

        res.send({ message: 'Password successfully changed' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// BOOKING RELATED END POINTS 

// Fetch Tenant-Specific Booking Requests

app.get('/booking/tenantRequests/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ requestedBy: userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Server error');
    }
});
// Create a New Booking Request
app.post('/booking/request', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Fetch All Bookings (for Security)
app.get('/api/bookings/security', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Server error');
    }
});
// Update Booking Status (for Security)
app.put('/api/bookings/:bookingId/:actionType', async (req, res) => {
    try {
        const { bookingId, actionType } = req.params;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        switch (actionType) {
            case 'confirm':
                booking.status = 'Confirmed';
                break;
            case 'cancel':
                booking.status = 'Cancelled';
                break;
            case 'complete':
                booking.status = 'Completed';
                break;
            default:
                return res.status(400).send('Invalid action type');
        }

        await booking.save();
        res.json(booking);
    } catch (error) {
        res.status(500).send('Server error');
    }
});
