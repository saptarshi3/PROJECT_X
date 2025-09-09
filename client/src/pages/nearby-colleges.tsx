import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ExternalLink, 
  Loader2, 
  Navigation, 
  School, 
  BookOpen,
  Award,
  Building,
  Clock,
  Users,
  Wifi,
  Car,
  AlertCircle,
  RefreshCw,
  Route
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";

interface College {
  college_name: string;
  city: string;
  state: string;
  distance: number;
  courses_offered: string[];
  cutoff_data: Record<string, number>;
  facilities: string[];
  website: string;
  established: number;
  affiliation: string;
  latitude: number;
  longitude: number;
}

interface ApiResponse {
  success: boolean;
  colleges: College[];
  total: number;
}

const facilityIcons = {
  "Library": BookOpen,
  "Hostel": Building,
  "Computer Lab": Wifi,
  "Workshop": Building,
  "Sports Complex": Users,
  "Hospital": Building,
  "Canteen": Users,
  "Parking": Car,
  "Auditorium": Users,
  "Research Center": School,
  "Placement Cell": Award,
  "default": Building
};

export default function NearbyColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setLocationStatus('requesting');
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLocationStatus('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationStatus('granted');
        fetchNearbyColleges(latitude, longitude);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setError(errorMessage);
        setLocationStatus('denied');
        
        // Fallback to default location (Delhi)
        toast({
          title: "Using Default Location",
          description: "Showing colleges near Delhi, India",
        });
        setUserLocation({ lat: 28.6139, lng: 77.2090 });
        fetchNearbyColleges(28.6139, 77.2090);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const fetchNearbyColleges = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("GET", `/api/colleges?lat=${lat}&lng=${lng}`);
      const data: ApiResponse = await response.json();

      if (data.success) {
        setColleges(data.colleges);
        toast({
          title: "Colleges Found!",
          description: `Found ${data.total} nearby government colleges`,
        });
      } else {
        throw new Error("Failed to fetch colleges");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch nearby colleges";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (userLocation) {
      fetchNearbyColleges(userLocation.lat, userLocation.lng);
    } else {
      getCurrentLocation();
    }
  };

  const openInMaps = (college: College) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(college.college_name + " " + college.city)}`;
    window.open(url, '_blank');
  };

  const getDirections = (college: College) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${college.latitude},${college.longitude}`;
      window.open(url, '_blank');
    }
  };

  const getFacilityIcon = (facility: string) => {
    const IconComponent = facilityIcons[facility as keyof typeof facilityIcons] || facilityIcons.default;
    return <IconComponent className="w-3 h-3" />;
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <MapPin className="w-8 h-8 text-primary" />
              Nearby Government Colleges
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover government colleges near you with real-time location-based search, course information, and direct navigation
            </p>
          </motion.div>

          {/* Location Status & Controls */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glassmorphism-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Navigation className={`w-5 h-5 ${locationStatus === 'granted' ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-medium">
                        {locationStatus === 'granted' && 'Location Access Granted'}
                        {locationStatus === 'requesting' && 'Requesting Location...'}
                        {locationStatus === 'denied' && 'Location Access Denied'}
                        {locationStatus === 'idle' && 'Enable Location Services'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {userLocation && `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`}
                        {locationStatus === 'denied' && 'Using default location (Delhi)'}
                        {locationStatus === 'requesting' && 'Getting your current location...'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleRefresh}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <Alert variant="destructive" className="glassmorphism border-red-500/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <Card className="glassmorphism-card p-8 text-center max-w-md">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Finding Nearby Colleges</h3>
                <p className="text-muted-foreground text-sm">
                  Searching for government colleges in your area...
                </p>
              </Card>
            </motion.div>
          )}

          {/* Colleges Grid */}
          {!loading && colleges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Results Summary */}
              <div className="mb-6 text-center">
                <p className="text-muted-foreground">
                  Found <span className="font-semibold text-foreground">{colleges.length}</span> government colleges near you
                </p>
              </div>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                <AnimatePresence>
                  {colleges.map((college, index) => (
                    <motion.div
                      key={`${college.college_name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        bounce: 0.3
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        transition: { duration: 0.2 } 
                      }}
                      className="group"
                    >
                      <Card className="glassmorphism-card h-full hover:bg-primary/5 transition-all duration-300 border-border/30 hover:border-primary/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                {college.college_name}
                              </CardTitle>
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{college.city}, {college.state}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                  <Route className="w-3 h-3 mr-1" />
                                  {college.distance} km away
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Est. {college.established}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {/* Courses */}
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <School className="w-4 h-4" />
                              Courses Offered
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {college.courses_offered.slice(0, 3).map((course, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-background/50">
                                  {course}
                                </Badge>
                              ))}
                              {college.courses_offered.length > 3 && (
                                <Badge variant="secondary" className="text-xs bg-background/50">
                                  +{college.courses_offered.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Cut-off Scores */}
                          {Object.keys(college.cutoff_data).length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Cut-off Scores
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(college.cutoff_data).slice(0, 2).map(([exam, score]) => (
                                  <div key={exam} className="text-xs bg-background/30 px-2 py-1 rounded">
                                    <span className="font-medium">{exam}:</span> {score}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Facilities */}
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Facilities
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {college.facilities.slice(0, 4).map((facility, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs flex items-center gap-1">
                                  {getFacilityIcon(facility)}
                                  {facility}
                                </Badge>
                              ))}
                              {college.facilities.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{college.facilities.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Affiliation */}
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Affiliated to:</span> {college.affiliation}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 gap-2"
                              onClick={() => openInMaps(college)}
                            >
                              <MapPin className="w-3 h-3" />
                              View on Map
                            </Button>
                            {userLocation && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => getDirections(college)}
                              >
                                <Navigation className="w-3 h-3" />
                                Directions
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2"
                              onClick={() => window.open(college.website, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {!loading && colleges.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <Card className="glassmorphism-card max-w-md mx-auto p-8">
                <School className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Colleges Found</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  No government colleges found in your area. Try refreshing or check your location settings.
                </p>
                <Button onClick={handleRefresh} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}